import { Op, fn, where, col } from 'sequelize';
import models from '../models';

const { MotorVehicle, User } = models;

const saveMotorVehicle = async (plateNumber, driverId, owner) => {
    const newMotorVehicle = await MotorVehicle.create({
        plateNumber,
        driver: driverId,
        owner,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return newMotorVehicle;
};

const findAllMotorVehicles = async () => {
    const foundMotorVehicles = await MotorVehicle.findAll({
        include: [{model: User, as: 'vehicleDriver', attributes: ['id', 'name', 'profilePhoto', 'phoneNumber', 'email']}]
    });
    return foundMotorVehicles;
};

const findMotorVehicleById = async (id) => {
    const foundMotorVehicle = await MotorVehicle.findOne({
        where: {
            id
        }
    });
    return foundMotorVehicle;
};

const findMotorVehiclesByKeyWord = async (key) => {
    const foundMotorVehicles = await MotorVehicle.findAll({
        include: [{model: User, as: 'vehicleDriver', attributes: ['id', 'name', 'profilePhoto', 'phoneNumber', 'email']}],
        where: {
            [Op.or]: [
                { plateNumber: where(fn('LOWER', col('plateNumber')), 'LIKE', '%' + key.toLowerCase() + '%') },
                { owner: where(fn('LOWER', col('owner')), 'LIKE', '%' + key.toLowerCase() + '%') },
            ]
        }
    });
    return foundMotorVehicles;
};

const findMotorVehicleByPlateNumber = async (plateNumber) => {
    return await MotorVehicle.findOne({
        where: {
            plateNumber
        }
    });
};

const findMotorVehicleByFieldName = async (name, value) => {
    return await MotorVehicle.findOne({
        where: {
            [name]: value
        }
    })
};

export {
    saveMotorVehicle,
    findMotorVehicleById,
    findAllMotorVehicles,
    findMotorVehiclesByKeyWord,
    findMotorVehicleByPlateNumber,
    findMotorVehicleByFieldName,
}
