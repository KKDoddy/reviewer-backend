import { Op } from 'sequelize';
import models from '../models';
import { hashPassword } from '../helpers/hasher';

const { User, Ride, Review, Cooperative } = models;


const saveUser = async (body) => {
    const {
        name,
        email,
        password,
        username,
        gender,
        role,
        birthDate,
        socialId,
        profilePhoto,
        provider,
        isVerified,
        cooperativeId,
        phoneNumber,
        reviewCount,
        cummulativeRating,
    } = body;
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
        phoneNumber,
        gender: gender.toUpperCase(),
        birthDate,
        socialId,
        profilePhoto,
        provider,
        password: hashedPassword,
        isVerified,
        role,
        cooperativeId,
        reviewCount,
        cummulativeRating,
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

const findUserByEmailAndOrUsernameAndPhoneNumber = async (email, username, phoneNumber) => {
    if(!email){
        email = ''
    }
    return await User.findAll({
        where: {
            [Op.or]: [
                { email },
                { username },
                { phoneNumber }
            ]
        }
    });
};

const findUserBy = async (field, value) => {
    return await User.findOne({
        where: {
            [field]: value
        },
        include: [{ model: Cooperative, as: 'memberOf' }]
    });
};

const findAllUsersByRole = async (role) => {
    if(role === 'MANAGER') {
        return await User.findAll({
            where: {
                role: role.toUpperCase()
            },
            include: [{ model: Cooperative, as: 'memberOf'}]
        });
    } else {
        return await User.findAll({
            where: {
                role: role.toUpperCase()
            }
        });
    }
};

const findUserByRoleAndId = async (role, id, rideAlias, reviewAlias) => {
    let user = {};
    if(rideAlias && reviewAlias) {
        user = await User.findOne({
            where: {
                [Op.and]: {
                    role: role.toUpperCase(),
                    id
                }
            },
            include: [{ model: Ride, as: rideAlias, where: { status: 'ENDED' }, required: false }, { model: Review, as: reviewAlias, include: [{ model: User, as: 'commuter', attributes: [ 'name', 'username', 'profilePhoto' ] }], required: false }]
        });
    } else {
        user = await User.findOne({
            where: {
                [Op.and]: {
                    role: role.toUpperCase(),
                    id
                }
            }
        });
    }
    return user;
};

const findUserByRoleAndCooperativeId = async (role, cooperativeId) => {
    return await User.findOne({
        where: {
            [Op.and]: {
                role,
                cooperativeId
            }
        }
    })
};

const findDriversByCooperativeId = async (cooperativeId) => {
    return await User.findAll({
        attributes: ['id', 'name', 'username', 'email', 'phoneNumber', 'profilePhoto', 'cummulativeRating', 'reviewCount'],
        where: {
            [Op.and]: {
                role: 'DRIVER',
                cooperativeId
            }
        }
    })
};

const findUserByRoleAndKeyWord = async (role, key) => {
    return await User.findAll({
        attributes: ['id', 'name', 'username', 'phoneNumber', 'email', 'profilePhoto', 'cummulativeRating', 'reviewCount'],
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
                    } },
                    { phoneNumber: {
                        [Op.like]: `%${key}%`
                    } }
                ]
            }
        },
        include: [{ model: Cooperative, as: 'memberOf'}]
    });
};

const searchDriversByRoleAndKeyWord = async (role, key, cooperativeId) => {
    return await User.findAll({
        attributes: ['id', 'name', 'username', 'phoneNumber', 'email', 'profilePhoto', 'cummulativeRating', 'reviewCount'],
        where: {
            [Op.and]: {
                role: role.toUpperCase(),
                cooperativeId,
                [Op.or]: [
                    { name: {
                        [Op.like]: `%${key}%`
                    } },
                    { email: {
                        [Op.like]: `%${key}%`
                    } },
                    { username: {
                        [Op.like]: `%${key}%`
                    } },
                    { phoneNumber: {
                        [Op.like]: `%${key}%`
                    } }
                ]
            }
        },
        include: [{ model: Cooperative, as: 'memberOf'}]
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

  const updateUser = async ({ name, username, phoneNumber, gender, birthdate, profilePhoto, id }) => {
      let userData = {}
      if(profilePhoto) {
          userData = { name, username, phoneNumber, gender: gender.toUpperCase(), birthdate, profilePhoto };
      } else {
        userData = { name, username, phoneNumber, gender: gender.toUpperCase(), birthdate };
      }
    return await User.update({
        ...userData
    },
    {
        where: {
            id
        }
    });
  };

  const updateRating = async ({reviewCount, cummulativeRating, driverId}) => {
      return await User.update({
          cummulativeRating,
          reviewCount,
      },
      {
          where: {
              id: driverId
          }
      });
  };

const findAllDriversByCooperative = async (cooperativeId) => {
    return await User.findAll({
        attributes: ['id', 'cooperativeId', 'cummulativeRating', 'reviewCount', 'name', 'profilePhoto', 'phoneNumber', 'email', 'username', 'gender'],
        where: {
            role: 'DRIVER',
            cooperativeId
        }
    });
};

export {
    saveUser,
    findUserBy,
    findAllUsersByRole,
    findUserByRoleAndId,
    findUserByRoleAndKeyWord,
    processSocialAuthUserData,
    findUserByUsernameOrEmail,
    findDriversByCooperativeId,
    findUserByEmailAndOrUsernameAndPhoneNumber,
    findUserByRoleAndCooperativeId,
    updateUser,
    updateRating,
    findAllDriversByCooperative,
    searchDriversByRoleAndKeyWord
}
