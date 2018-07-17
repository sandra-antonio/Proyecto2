const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const mongoose = require('mongoose');
const Center = require('../models/workCenter');
const multer = require('multer');
const upload = multer({dest: './public/uploads'});
const hbs = require('hbs');

router.get('/centers', (req, res) => {
  Center.find()
    .then( (centers) => {
      res.render('centers/centersList', {centers});
    })
    .catch( (err) => 
      console.log(err));
    });



module.exports = router;