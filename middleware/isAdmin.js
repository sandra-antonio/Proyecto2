const requireAdmin = redirectTo => (req, res, next) => {
    
  if(req.user && req.user.isadmin){
    next();
  }else{
    res.redirect(redirectTo)
  }
}
 

module.exports = requireAdmin;

 