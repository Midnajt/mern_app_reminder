import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log('console.log at app.use error middleware handling: ', err);
  // if error doesn't have status code, set it to 500 from StatusCodes library
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  // if error doesn't have message, set it to 'Something went wrong. Server error'
  const msg = err.message || 'Something went wrong. Server error';
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
