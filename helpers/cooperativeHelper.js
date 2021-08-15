import { Op } from 'sequelize';
import models from '../models';

const { Cooperative, User } = models;

const saveCooperative = async (name, email, phone, location) => {
    const newCooperative = await Cooperative.create({
        name: name.toUpperCase(),
        email,
        phone,
        location,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return newCooperative;
};

const findAllCooperatives = async () => {
    const foundCooperativesByKeyWord = await Cooperative.findAll({
        include: [
            { model: User, as: 'memberOf', where: { role: 'MANAGER' }, attributes: [ 'id', 'name', 'role', 'username', 'email', 'phoneNumber', 'profilePhoto' ] },
        ]
    });
    return foundCooperativesByKeyWord;
};

const findCooperativeById = async (id) => {
    const foundCooperative = await Cooperative.findOne({
        where: {
            id
        }
    });
    return foundCooperative;
};

const findDuplicates = async (name,email,phone) => {
    return await Cooperative.findOne({
        where: {
            [Op.or]: [
                { name: name.toUpperCase() },
                { email },
                { phone }
            ]
        }
    });
};

const findCooperativesByKeyWord = async (key) => {
    const foundCooperatives = await Cooperative.findAll({
        where: {
            [Op.or]: [
                { name: {
                    [Op.like]: `%${key}%`
                } },
                { email: {
                    [Op.like]: `%${key}%`
                } },
                { phone: {
                    [Op.like]: `%${key}%`
                } }
            ]
        },
        include: [
            { model: User, as: 'memberOf', where: { role: 'MANAGER' }, attributes: [ 'id', 'name', 'role', 'username', 'email', 'phoneNumber', 'profilePhoto' ] },
        ]
    });
    return foundCooperatives;
};

export {
    saveCooperative,
    findCooperativeById,
    findAllCooperatives,
    findCooperativesByKeyWord,
    findDuplicates
}
