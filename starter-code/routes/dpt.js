const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const mongoose = require('mongoose');
const dpt = require('../models/dpt');
const multer = require('multer');
const upload = multer({dest: './public/uploads'});
const hbs = require('hbs');


//Get all DPT´s
router.get('/dpt', (req, res) => {
  dpt.find()
    .then( (dpt) => {
      res.render('dpts/catalog', {dpt});
    })
    .catch( (err) => {
      console.log(err);
    });
});

//Get one DPT
router.get("/dpt/:id", (req, res, next) => {
  dpt.findById(req.params.id).then(dpt => {
    res.render("dpts/dpt", { dpt });
  });
});


//Update a DPT
router.get("/dpt/edit/:id", (req, res) => {
  dpt.findById(req.params.id).then(dpt => {
    res.render("dpts/editdpt", { dpt });
  });
});

/* Updating DPT in DB */
router.post("/dpt/edit/:id", (req, res) => {
  const { title, genre, plot } = req.body;
  dpt.findByIdAndUpdate(req.params.id, { title, genre, plot }).then(dpt => {
    res.redirect("/dpts/catalog");
  });
});
// router.get('/post/new', ensureLoggedIn(), (req, res, next) => {
//   res.render('post/new');
// })

// router.post('/post/new', ensureLoggedIn(), upload.single('image'), (req, res, next) => {
//   const newPost = new Posts({
//     content: req.body.content,
//     creatorId: req.user._id,
//     picPath: `uploads/${req.file.filename}`,
//     picName: req.file.originalname
//   });

//   newPost.save()
//     .then( () =>{
//       console.log("Post inserted succesfully");
//       res.redirect('/post');
//     })
// })

// router.get('/post/comment/:id', ensureLoggedIn(), (req, res, next) => {
//   Posts.findById(req.params.id).then(post => {
//   res.render('post/com', {post});
  
// })

//   router.post('/post/comment/:id', ensureLoggedIn(), upload.single('image'), (req, res, next) => {
//   Posts.findByIdAndUpdate(req.params.id)
//   .then( post => {
//     post.comments.push({
//       comcontent:req.body.content,
//       authorId: req.user._id,
//       comimagePath: `uploads/${req.file.filename}`,
//       comimageName: req.file.originalname
//     })
//     console.log(post)
//     console.log("Post commented succesfully");
//     res.redirect('/post');
//   }) 
//   .catch(error => console.log(error));
//   });
// });

module.exports = router;

