import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';

export const getCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: ' getCurrentUserroute' });
};
export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: ' getApplicationStats' });
};
export const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: ' updateUser' });
};
