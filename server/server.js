import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userController from './controllers/userController.js';
import jobController from './controllers/jobController.js';

// the following imports are used for the purpose of resolving env location
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config({ path: __dirname + '/../.env' });

const PORT = process.env.PORT;

const MONGO_URI = process.env.MONGO_URI;

app.post('/', jobController.getJobData, (req, res) => {
  //console.log(res.locals.jobs);
  //console.log(res.locals.jobs);

  return res.status(200).json(res.locals.jobs);
});

app.post('/register', userController.register, (req, res) => {
  return res.status(201).json(res.locals.savedUser);
});

app.post('/login', userController.login, (req, res) => {
  console.log(`res.locals.user: ${res.locals.user}`);
  return res.status(200).json(res.locals.user);
});

/* Not used anywhere
app.get('/userData', userController.getUserData, (req, res) => {
  return res.status(200).json(res.locals.userData);
}); */

// 404 route handler
app.use((req, res) => res.sendStatus(404));

// create global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: `Express error handler caught unknown middleware error: ${err}`,
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

mongoose
  .connect(MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: 'tech_recruiter',
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  })
  .catch((error) => console.log(`error connecting to MONGO: ${error}`));
