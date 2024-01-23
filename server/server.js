const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/routers.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
// const login = require ('./controllers/login.js');
// const getUserData = require('./controllers/getUserData.js');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.get('/', router);
//app.get("/userData", getUserData);

app.post('/register', userController.register);

app.post('/login', userController.login);

// 404 route handler
app.use((req, res) => res.sendStatus(404));

// create global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  })
  .catch((error) => console.log(`error connecting to MONGO: ${error}`));
