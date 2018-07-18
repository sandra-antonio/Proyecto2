const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const mongoose = require("mongoose");
const Users = require("../models/user");
const Center = require("../models/workCenter");
const Dpt = require("../models/dpt");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });
const hbs = require("hbs");
const bcrypt = require("bcrypt");

router.get("/users", (req, res) => {
  Users.find()
    .populate("workCenter")
    .populate("dpt")
    .then(users => {
      res.render("users/usersList", { users });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/users/data', (req, res, next) => {
  Users.find()
  .populate("workCenter")
    .populate("dpt")
    .then(users => {
      res.render("users/charts", { users });
    })
    .catch(err => {
      console.log(err);
    });
});


router.get("/users/edit/:id", (req, res) => {
  Users.findById(req.params.id)
    .populate("workCenter")
    .populate("dpt")
    .then(user => {
      Center.find()
        .then(centers => {
          Dpt.find()
            .then(dpts => {
              centers = centers.filter(el => el.name !== user.workCenter.name);
              dpts = dpts.filter(el => el.Denom !== user.dpt.Denom);
              res.render("users/editUser", { user, centers, dpts });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
});


router.get("/users/profile/:id", (req, res) => {
  Users.findById(req.params.id)
  .populate("workCenter")
  .populate("dpt")
  .then(user => {
    Users.find(
     {$and: [{workCenter: user.workCenter._id},{_id: {$ne: user._id}}]}
    ).then(centerusers => {
      console.log(centerusers)
      console.log(user.workCenter.coordinates)
      res.render("users/userprofile", { user, centro: JSON.stringify(user.workCenter), centerusers });
    })
  })
  .catch(err => {
    console.log(err);
  });
});

router.get("/users/dpt",(req,res) => {
  console.log(req.user)
  Dpt.findById(req.user.dpt)
  .then(dpt => {
    res.render("dpts/dpt", {dpt})
  })
})

/* Updating user in DB */
router.post("/users/edit/:id", upload.single("profilePic"), (req, res) => {
  const {
    username,
    name,
    surname,
    email,
    password,
    dpto,
    workCenter,
    dpt
  } = req.body;
  const update = {
    username,
    name,
    surname,
    email,
    dpto,
    workCenter,
    dpt
  };
  Center.findOne({ name: workCenter }).then(center => {
    Dpt.findOne({ Denom: dpt }).then(dpts => {
      if (req.file){
        update.path = `uploads/${req.file.filename}`;
        update.originalName = req.file.originalname;
      }
      if(password !== ""){
      const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      update.password = hashPass;
      }
      update.workCenter = center._id;
      update.dpt = dpts._id;
      Users.findByIdAndUpdate(req.params.id, update)
        .then(user => {
          res.redirect("/users");
        })
        .catch(err => console.log(err));
    });
  });
});

router.get("/users/delete/:id", (req, res) => {
  Users.findByIdAndRemove(req.params.id, () => res.redirect("/users"));
});

module.exports = router;
