const User = require('../models/user');

function indexRoute(req, res, next){
  User
    .find()
    .exec()
    .then(users => res.json(users))
    .catch(next);
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate({
      path: 'foods',
      populate: {
        path: 'requests.user'
      }
    })
    .exec()
    .then(user => {
      if(!user) return res.sendStatus(404);
      return res.json(user);
    })
    .catch(next);
}


module.exports = {
  show: showRoute,
  index: indexRoute
};
