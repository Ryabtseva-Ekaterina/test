const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// const NotFound = require('../errors/notFound');
// const BadRequest = require('../errors/badRequest');

module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      firstName: req.body.firstName,
      surname: req.body.surname,
      email: req.body.email,
      password: hash,
      zoomLogin: req.body.zoomLogin,
      birth: req.body.birth,
      gender: req.body.gender,
    }))
    .then((user) => {
      const userData = {
        email: user.email,
        firstName: user.firstName,
        surname: user.surname,
        zoomLogin: user.zoomLogin,
        birth: user.birth,
        gender: user.gender,
        _id: user._id,
      };
      res.status(200).send(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
      res.send({ message: 'произошла ошибка' });
    });
};

module.exports.login = ((req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key');
      res.send({ token });
    })
    .catch((err) => res.status(401).send({ message: err.message }));
});

module.exports.getUserInfo = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};
