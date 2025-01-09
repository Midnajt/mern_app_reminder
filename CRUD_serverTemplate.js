import * as dotenv from 'dotenv'; // to avoid issues put in on top
dotenv.config(); // loading vars from .env to process.env
import express from 'express';
const app = express();
import morgan from 'morgan';
import { nanoid } from 'nanoid'; // generate unique ids

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
];

if (process.env.NODE_DEV === 'development') {
  app.use(morgan('dev')); // middleware to log requests in console
}

app.use(express.json()); // middleware to parse json data

app.get('/', (req, res) => {
  res.send('Server is working 💥💥💥');
});

app.post('/', (req, res) => {
  res.json({ message: 'data recived:', data: req.body });
});

// GET ALL JOBS
app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});

// CREATE AN JOB
app.post('/api/v1/jobs', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: 'Please provide company and position' });
  }

  const job = { id: nanoid(10), company, position };
  jobs.push(job);
  res.status(201).json({ job });
});

// GET SINGLE JOB

app.get('/api/v1/jobs/:id', (req, res) => {
  // req.params contains information about the route parameters
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job with id ${id}` });
  }

  res.status(200).json({ job });
});

// EDIT JOB
app.patch('/api/v1/jobs/:id', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: 'Please provide company and position' });
  }

  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job with id ${id}` });
  }

  job.company = company;
  job.position = position;

  res.status(200).json({ msg: 'Job modified', job });
});

// DELETE JOB
app.delete('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job with id ${id}` });
  }

  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  res.status(200).json({ msg: 'Job deleted' });
});

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

app.listen(port, () => {
  console.log(`👌 Server is listening on port ${port}`);
});
