

module.exports = function(req, res, next) {
  console.log('log verify');
  console.log(req.user);
  // console.log(req.user, 'ở verify');
  // console.log(req.user.id,'req.user.id');
  // console.log(req.params.id, 'req.params.id');
  // console.log(req.user.admin,'req.user.admin');
    // console.log(req.locals.user, 'log verify');
    if (req.user.admin === true) {
      next();
    } else {
      res.forbidden('You are not allowed to delete this');
    }

};