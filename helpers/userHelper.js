import { Op } from 'sequelize';
import models from '../models';
import { hashPassword } from '../helpers/hasher';

const { User } = models;


const saveUser = async (body) => {
    const { name, email, password, username, gender, birthDate } = body;
    const { salt, hashedPassword } = await hashPassword(password);
    const savedUser = await User.create({
        name,
        email,
        password: hashedPassword,
        salt,
        username,
        gender,
        birthDate,
        isVerified: false,
        profilePhoto: '',
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

export default {
    saveUser,
    findUserByUsernameOrEmail
}
