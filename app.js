require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const { errors } = require('celebrate');
const cors = require('./middlewares/corsOptions');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const users = require('./routes/users');
// const errorsHandler = require('./middlewares/errorsHandler');

const app = express();
app.use(cors);
app.use(express.json());

mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/doorsdb', {
  useNewUrlParser: true,
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', users);

// app.use(errors());

// app.use(errorsHandler);

app.listen(process.env.NODE_ENV === 'production' ? process.env.PORT : 3001, () => {
  console.log(`App listening on port ${process.env.NODE_ENV === 'production' ? process.env.PORT : 3001}`);
});
