import { Op } from 'sequelize';
import models from '../models';
import { hashPassword } from '../helpers/hasher';

const { User } = models;


const saveUser = async (body) => {
    const { name, email, password, username, gender, role, birthDate, socialId, profilePhoto, provider, isVerified } = body;
    let salt, hashedPassword;
    if(password){
        const hashDetails = await hashPassword(password);
        salt = hashDetails.salt;
        hashedPassword = hashDetails.hashedPassword;
    }
    const savedUser = await User.create({
        name,
        email,
        salt,
        username,
        gender: gender.toUpperCase(),
        birthDate,
        socialId,
        profilePhoto,
        provider,
        password: hashedPassword,
        isVerified,
        role,
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

const findUserByEmailAndOrUsername = async (email, username) => {
    return await User.findAll({
        where: {
            [Op.or]: [
                { email },
                { username }
            ]
        }
    });
};

const findUserBy = async (field, value) => {
    return await User.findOne({
        where: {
            [field]: value
        }
    });
};

const findAllUsersByRole = async (role) => {
    return await User.findAll({
        where: {
            role: role.toUpperCase()
        }
    });
};

const findUserByRoleAndId = async (role, id) => {
    return await User.findOne({
        where: {
            [Op.and]: {
                role: role.toUpperCase(),
                id
            }
        }
    });
};

const findUserByRoleAndKeyWord = async (role, key) => {
    return await User.findAll({
        where: {
            [Op.and]: {
                role: role.toUpperCase(),
                [Op.or]: [
                    { name: {
                        [Op.like]: `%${key}%`
                    } },
                    { email: {
                        [Op.like]: `%${key}%`
                    } },
                    { username: {
                        [Op.like]: `%${key}%`
                    } }
                ]
            }
        }
    });
};

const processSocialAuthUserData = async (userData) => {
    const { _json } = userData;
    const id = userData.provider === 'facebook' ? _json.id : _json.sub;
    let userExists = await findUserBy('socialId', id);
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
    _json.socialId = id;
    _json.provider = userData.provider;
    return { isNew: true, user: _json };
  }

export {
    saveUser,
    findUserBy,
    findUserByRoleAndId,
    findAllUsersByRole,
    findUserByRoleAndKeyWord,
    findUserByUsernameOrEmail,
    processSocialAuthUserData,
    findUserByEmailAndOrUsername
}
