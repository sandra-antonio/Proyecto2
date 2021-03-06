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

router.get("/users", ensureLoggedIn(), (req, res) => {
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


router.get("/users/edit/:id", ensureLoggedIn(), (req, res) => {
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


router.get("/users/profile/:id", ensureLoggedIn(), (req, res) => {
  Users.findById(req.params.id)
  .populate("workCenter")
  .populate("dpt")
  .then(user => {
    Users.find(
     {$and: [{workCenter: user.workCenter._id},{_id: {$ne: user._id}}]}
    )
    .populate("dpt")
    .then(centerusers => {
      console.log(centerusers)
      console.log(user.workCenter.coordinates)
      res.render("users/userprofile", { user, centro: JSON.stringify(user.workCenter), centerusers });
    })
  })
  .catch(err => {
    console.log(err);
  });
});

router.get("/users/dpt",ensureLoggedIn(), (req,res) => {
  console.log(req.user)
  Dpt.findById(req.user.dpt)
  .then(dpt => {
    res.render("dpts/dpt", {dpt})
  })
})

router.get("/users/dashboard", ensureLoggedIn(), (req,res) => {
  console.log(req.user)
  Dpt.findById(req.user.dpt)
  .then(dpt => {
    res.render("centers/dashboard", {dpt})
  })
})

// router.get("/users/dashboard", (req, res) => {
//   Users.findById(req.params.id)
//   .populate("workCenter")
//   .populate("dpt")
//   .then(user => {
//     Users.find(
//      {$and: [{workCenter: user.workCenter._id},{_id: {$ne: user._id}}]}
//     )
//     .populate("dpt")
//     .then(centerusers => {
//       console.log(centerusers)
//       console.log(user.workCenter.coordinates)
//       res.render("centers/dashboard", { user, centro: JSON.stringify(user.workCenter), centerusers });
//     })
//   })
//   .catch(err => {
//     console.log(err);
//   });
// });



/* Updating user in DB */
router.post("/users/edit/:id", ensureLoggedIn(), upload.single("profilePic"), (req, res) => {
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

router.post("/users/admin/:id", ensureLoggedIn(), (req, res) =>{
  Users.findById(req.params.id).then( user => {
    let admin;    
    if(user.isadmin){
      admin = false;
    } else {
      admin = true;
    }
    user.update({isadmin : admin})
    .then(()=> res.redirect("/users"))
  })
})

router.get("/users/delete/:id", ensureLoggedIn(), (req, res) => {
  Users.findByIdAndRemove(req.params.id, () => res.redirect("/"));
});

module.exports = router;
