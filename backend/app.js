const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const defaultErrorHandler = require('./errors/defaultErrorHandler');
const { signupValidate, loginValidate } = require('./middlewares/celebrate');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('«Соединение с базой данных успешно»'))
  .catch((err) => console.log(err, '«Ошибка подключения к базе данных»'));

app.post('/signin', loginValidate, login);
app.post('/signup', signupValidate, createUser);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/*', (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

app.use(errors());
app.use(defaultErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
