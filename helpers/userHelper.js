import { Op } from 'sequelize';
import models from '../models';
import { hashPassword } from '../helpers/hasher';

const { User } = models;


const saveUser = async (body) => {
    const { name, email, password, username, gender, birthDate, social_id, profilePhoto, provider, isVerified } = body;
    let salt, hashedPassword;
    if(password){
        hashDetails = await hashPassword(password);
        salt = hashDetails.salt;
        hashedPassword = hashDetails.hashedPassword;
    }
    const savedUser = await User.create({
        name,
        email,
        salt,
        username,
        gender,
        birthDate,
        social_id,
        profilePhoto,
        provider,
        password: hashedPassword,
        isVerified,
        role: 'commuter',
        createdAt: new Date(),
        updatedAt: new Date()
    });
    return savedUser
};

const findUserByUsernameOrEmail = async (usernameOrEmail) => {
    return await User.findOne({
        where: {
            [Op.or]: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        }
    });
};

const findUserBy = async (field, email) => {
    return await User.findOne({
        where: {
            [field]: email
        }
    });
};

const processSocialAuthUserData = async (userData) => {
    const { _json } = userData;
    const id = userData.provider === 'facebook' ? _json.id : _json.sub;
    let userExists = await findUserBy('social_id', id);
    if (userExists) {
      return { isNew: false, user: userExists };
    }
    userExists = await findUserBy('email', userData.emails[0].value);
    if (userExists) {
      return { isNew: true, error: `email: ${userData.emails[0].value}, is already in use` };
    }
    _json.profilePhoto = userData.provider === 'facebook' ? `https://graph.facebook.com/${id}/picture?type=large` : _json.picture;

    const username = userData.displayName.toLowerCase().replace(' ','.');
    _json.username = username;
    _json.social_id = id;
    _json.provider = userData.provider;
    return { isNew: true, user: _json };
  }

export default {
    saveUser,
    findUserByUsernameOrEmail,
    processSocialAuthUserData
}
