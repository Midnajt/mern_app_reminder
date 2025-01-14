import { body, param, validationResult } from 'express-validator'; // middleware to validate requests
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';

// below is refactored code from this vanilla validation code
// import { body, validationResult } from 'express-validator';
// app.post(
//   '/api/v1/test',
//   // in array we can put as many validators as we want
//   [body('name').notEmpty().withMessage('Name is required').isLength({ min: 50 }).withMessage('Name must be at least 50 characters long')],
//   //after validators we put middleware that will handle errors
//   (req, res, next) => {
//     // validationResult is a function that checks if there are any errors in the request
//     const errors = validationResult(req);
//     // if there are errors we return them as an array
//     if (!errors.isEmpty()) {
//       // we map through errors array and return only the message
//       const errorMessages = errors.array().map((error) => error.msg);
//       return res.status(400).json({ errors: errorMessages });
//     }
//     next();
//   },
//   (req, res) => {
//     const { name } = req.body;
//     res.json({ message: `Hello ${name}` });
//   }
// );

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        // change status code to 404 if error message starts with 'No job'
        if (errorMessages[0].startsWith('No job')) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('Company is required '),
  body('position').notEmpty().withMessage('Position is required '),
  body('jobLocation').notEmpty().withMessage('Job location is required '),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('Invalid job status '),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('Invalid job type '),
]);

export const validateIdParam = withValidationErrors([
  param('id')
    // async because we are using mongoose to check if id is valid
    .custom(async (value) => {
      const isValidId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidId) {
        throw new BadRequestError('Invalid MongoDB id');
      }
      const job = await Job.findById(value);

      if (!job) {
        throw new NotFoundError(`No job with id ${value}`);
      }
    }),
]);
