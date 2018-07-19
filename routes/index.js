const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.user)
  if(req.user && req.user.isadmin) {
    res.redirect('/users/data');
  }else if(req.user && !req.user.isadmin){
    res.redirect(`/users/profile/${req.user._id}`)
  }
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

module.exports = router;
