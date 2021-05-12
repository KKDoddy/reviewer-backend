import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../models';

dotenv.config();

const { User } = models;
const { Token } = models;

const verifyToken = async (req, res, next) => {
  try {
    const access_token = req.header('access_token');
    const verify = jwt.verify(access_token, process.env.JWT_SECRET);
    const userExists = await User.findOne({
      where: { id: verify.id }
    });
    const tokenExists = await Token.findOne({
      where: { tokenValue: access_token }
    });

    if (userExists) {
      if (tokenExists) {
        req.user = userExists;
        return next();
      }
      return res.status(401).json({ status: 401, error: 'Already logged out. Sign in and try again.' });
    }
    return res.status(401).json({ status: 401, error: 'User not recognised. Please create account and try again.' });
  } catch (error) {
    return res.status(400).json({ status: 400, error: 'Malformed/ Incorrect security token ! Check token and try again.' });
  }
};

export default verifyToken;
