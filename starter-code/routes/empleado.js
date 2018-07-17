const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const mongoose = require('mongoose');
const Users = require('../models/user');
const Center = require('../models/workCenter');
const Dpt = require('../models/dpt');
const multer = require('multer');
const upload = multer({dest: './public/uploads'});
const hbs = require('hbs');
const bcrypt = require('bcrypt');

router.get('/users', (req, res) => {
  Users.find()
  .populate("workCenter")
  .populate("dpt")
    .then( (users) => {
      console.log(users)
      res.render('users/usersList', {users});
    })
    .catch( (err) => {
      console.log(err);
    });
});

router.get("/users/edit/:id", (req, res) => {
  Users.findById(req.params.id)
  .populate('workCenter')
  .populate('dpt')
  .then(user => {
    Center.find()
    .then(centers => {
      Dpt.find()
        .then(dpts => {
          centers = centers.filter( (el) => el.name !== user.workCenter.name)
          dpts = dpts.filter( (el) => el.Denom !== user.dpt.Denom)
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

/* Updating movie in DB */
router.post("/users/edit/:id", upload.single('profilePic'), (req, res) => {
  const { username, name, surname, email, password, dpto, workCenter, dpt } = req.body;
  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  Users.findById( req.params.id ).then( user => {
    if(!req.file) {
      req.file = {
        filename: user.profilePic.path,
        originalname: user.profilePic.name
      }
    }
  })
  console.log(req.file);
  Users.findByIdAndUpdate(req.params.id, { 
    username, 
    name, 
    surname, 
    email, 
    dpto, workCenter, 
    dpt, 
    profilePic: {
    name: req.body.name,
    path: `uploads/${req.file.filename}`,
    originalName: req.file.originalname
    } 
  }).then(user => {
    res.redirect("/users");
  }).catch(err => console.log(err))
});

router.get('/users/delete/:id',(req,res) => {
  Users.findByIdAndRemove(req.params.id, () => res.redirect('/users'));
})

module.exports = router;