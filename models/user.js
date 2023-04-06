const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  surname: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
  },
  zoomLogin: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  birth: {
    type: Date,
    require: true,
  },
  gender: {
    type: String,
    require: true,
    enum: ['female', 'male', 'other'],
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильная почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильная почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
