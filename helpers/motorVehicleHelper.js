import { Op } from 'sequelize';
import models from '../models';

const { MotorVehicle } = models;

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
    const foundMotorVehicles = await MotorVehicle.findAll();
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
        where: {
            [Op.or]: [
                { plateNumber: {
                    [Op.like]: `%${key}%`
                } },
                { owner: {
                    [Op.like]: `%${key}%`
                } }
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

export {
    saveMotorVehicle,
    findMotorVehicleById,
    findAllMotorVehicles,
    findMotorVehiclesByKeyWord,
    findMotorVehicleByPlateNumber
}
