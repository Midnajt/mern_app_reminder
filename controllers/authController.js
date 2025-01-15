import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { hashPassword } from '../utils/passwordUtils.js';

export const login = async (req, res) => {
  const user = await User.findOne(req.body);
  res.status(StatusCodes.OK).json({ user });
};

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ mgs: 'user created' });
};
