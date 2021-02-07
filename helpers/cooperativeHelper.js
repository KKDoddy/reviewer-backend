import { Op } from 'sequelize';
import models from '../models';

const { Cooperative } = models;

const saveCooperative = async (name, email, phone, managerId) => {
    const newCooperative = await Cooperative.create({
        name,
        email,
        phone,
        location: '',
        manager: managerId,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return newCooperative;
};

const findAllCooperatives = async () => {
    const foundCooperativesByKeyWord = await Cooperative.findAll();
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
        }
    });
    return foundCooperatives;
};

export {
    saveCooperative,
    findCooperativeById,
    findAllCooperatives,
    findCooperativesByKeyWord
}
