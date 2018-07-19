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

router.get("/users/data", ensureLoggedIn(), (req, res) => {
  Users.find()
    .populate("workCenter")
    .populate("dpt")
    .then(datacenters => {
      let obj = {};
      datacenters.forEach(e => {
        if (obj[e.workCenter.name]) {
          obj[e.workCenter.name]++
        } else {
          obj[e.workCenter.name] = 1
        }
      })
    
      
      console.log(datacenters)

      res.render("centers/dashboard", { datacenters, obj:JSON.stringify(obj), centers: JSON.stringify(datacenters)});
    })
    .catch(err => {
      console.log(err);
    });
  });

module.exports = router;
