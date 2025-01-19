import { StatusCodes } from 'http-status-codes';

// with that code we can use
// throw new NotFoundError(`No job with id ${id}`);
// instead of
// return res.status(404).json({ msg: `No job with id ${id}` });

export class NotFoundError extends Error {
  constructor(message) {
    super(message); //attaching message to Error object
    this.name = 'NotFound middleware from errors folder';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message); //attaching message to Error object
    this.name = 'BadRequest middleware from errors folder';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message); //attaching message to Error object
    this.name = 'Unauthenticated middleware from errors folder';
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message); //attaching message to Error object
    this.name = 'Unauthorized middleware from errors folder';
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
