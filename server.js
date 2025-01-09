import * as dotenv from 'dotenv'; // to avoid issues put in on top
dotenv.config(); // loading vars from .env to process.env
import express from 'express';
import morgan from 'morgan';

const app = express();
if (process.env.NODE_DEV === 'development') {
  app.use(morgan('dev')); // middleware to log requests in console
}

app.use(express.json()); // middleware to parse json data

app.get('/', (req, res) => {
  res.send('Server is working 💥💥💥');
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.json({ message: 'data recived:', data: req.body });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`👌 Server is listening on port ${port}`);
});
