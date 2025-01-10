import * as dotenv from 'dotenv'; // to avoid issues put in on top
dotenv.config(); // loading vars from .env to process.env
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';

//routers
import jobRouter from './routes/jobRouter.js';
app.use('/api/v1/jobs', jobRouter);

if (process.env.NODE_DEV === 'development') {
  app.use(morgan('dev')); // middleware to log requests in console
}

app.use(express.json()); // middleware to parse json data

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Route not found (app.use("*"))' });
});

app.use((err, req, res, next) => {
  // error handling middleware must be defined last
  // throw New Error is triggering this middleware
  console.log(err);
  res.status(500).json({ msg: 'Something went wrong. Server error' });
});

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`👌 Server is listening on port ${port}. ⛅Mongoose connected`);
  });
} catch (error) {
  console.log(`❗ Fat Error: ${error.message}`);
  process.exit(1);
}
