import 'express-async-errors'; // to handle async errors in express instead of trycatch at controllers
import * as dotenv from 'dotenv'; // to avoid issues put in on top
dotenv.config(); // loading vars from .env to process.env
import express from 'express';
const app = express();
app.use(express.json()); // middleware to parse json data, must be before routes
import morgan from 'morgan';
import mongoose from 'mongoose';

if (process.env.NODE_DEV === 'development') {
  app.use(morgan('dev')); // middleware to log requests in console, must be before routes
}

app.get('/', (req, res) => {
  res.send('⚜ Hello there ⚜');
});

//routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/auth', authRouter);

import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import User from './models/UserModel.js';

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Route not found (app.use("*"))' });
});

// error handling middleware must be defined last
// throw New Error is triggering this middleware
// showing only synchronous errors
// console.log is showing info from error middleware that is in jobControllers functions
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`👌 Server is listening on port ${port}. ⛅Mongoose connected`);

    // const deleteAllUsers = async (req, res) => {
    //   try {
    //     await User.deleteMany({});
    //     // res.status(200).json({ msg: 'All users have been deleted' });
    //     console.log('deleted');
    //   } catch (error) {
    //     console.log('not deleted');
    //   }
    // };

    // deleteAllUsers();
  });
} catch (error) {
  console.log(`❗ Fat Error: ${error.message}`);
  process.exit(1);
}