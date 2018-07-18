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

router.get('/users/dashboard', (req, res) =>{
  Users.find()
    .populate("workCenter")
    .populate("dpt")
    .then(users => {
      res.render("centers/dashboard", { users });
    })
    .catch(err => {
      console.log(err);
    });
});

}
)