const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const mongoose = require('mongoose');
const Center = require('../models/workCenter');
const User = require('../models/user');
const multer = require('multer');
const upload = multer({dest: './public/uploads'});
const hbs = require('hbs');

router.get('/centers', (req, res) => {
  Center.find()
    .then( (centers) => {
      res.render('centers/centersList', {centers});
    })
    .catch( (err) => {
      console.log(err)
    });
});

router.get('/centers/location', (req, res, next) => {
  Center.find()
    .then( (centers) => {
      res.render('centers/centersLocation', {centers:JSON.stringify(centers), center:centers});
      console.log(centers)
    })
    .catch( (err) => {
      console.log(err)
    });
});

router.get("/centers/edit/:id", (req, res) => {
  Center.findById(req.params.id).then(center => {
    res.render("centers/editCenter", { center });
  });
});

router.post("/centers/edit/:id", (req, res) => {
  const { name, description, lat, lng } = req.body;
  Center.findByIdAndUpdate(req.params.id, {  
    name, 
    description,
    coordinates: [lat, lng]
  }).then(user => {
    res.redirect("/centers");
  }).catch(err => console.log(err))
});

//Esta es privada
router.get("/centers/create", (req, res) => {
  Center.findById(req.params.id).then(center => {
    res.render("centers/createCenter", { center });
  });
});

router.post("/centers/create",(req, res) => {
  const { name, description, lat, lng } = req.body;
  const newCenter = new Center({
    name,
    description,
    coordinates: [ lat, lng]
  });

  newCenter.save(error => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/centers");
    }
  });
});

router.get("/centers/viewcenter/:id", (req, res) => {
  const centerId = req.params.id;
  Center.findById(centerId).then(center => {
    User.find({workCenter: centerId})
    .populate("workCenter")
    .populate("dpt")
    .then( users => {
      console.log(center)
      res.render("centers/viewCenter", {centers:JSON.stringify(center), center:center, users});
    })
  });
});

router.get('/centers/delete/:id',(req,res) => {
  Center.findByIdAndRemove(req.params.id, () => res.redirect('/centers'));
})


module.exports = router;