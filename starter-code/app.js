const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const flash = require("connect-flash");
const hbs = require("hbs");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });
const Center = require("./models/workCenter");
const Dpt = require("./models/dpt");

mongoose.connect("mongodb://localhost:27017/proyecto2");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(
  session({
    secret: "tumblrlabdev",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

passport.use(
  "local-login",
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }

      return next(null, user);
    });
  })
);

passport.use(
  "local-signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, next) => {
      // To avoid race conditions
      process.nextTick(() => {
        User.findOne(
          {
            username: username
          },
          (err, user) => {
            if (err) {
              return next(err);
            }

            if (user) {
              return next(null, false);
            } else {
              // Destructure the body
              const {
                username,
                name,
                surname,
                dpto,
                workCenter,
                dpt,
                email,
                password
              } = req.body;
              const create = {
                username,
                name,
                surname,
                dpto,
                workCenter,
                dpt,
                email,
              }
              Center.findOne({ name: workCenter }).then(center => {
                Dpt.findOne({ Denom: dpt }).then(dpts => {
                  if (req.file){
                    create.path = `uploads/${req.file.filename}`;
                    create.originalName = req.file.originalname;
                  }
                  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                  create.password = hashPass;
                  create.workCenter = center._id;
                  create.dpt = dpts._id;
                  
                  const newUser = new User(create);
                  newUser.save(err => {
                    if (err) {
                      console.log(err);
                      next(null, false, { message: newUser.errors });
                    }
                    return next(null, newUser);
                  });
                });
              });
            }
          }
        );
      });
    }
  )
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const index = require("./routes/index");
const authRoutes = require("./routes/authentication");
const postRoutes = require("./routes/post");
const dptRoutes = require("./routes/dpt");
const empleadoRoutes = require("./routes/empleado");
const centerRoutes = require("./routes/center");
app.use("/", index);
app.use("/", authRoutes);
app.use("/", postRoutes);
app.use("/", dptRoutes);
app.use("/", empleadoRoutes);
app.use("/", centerRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
