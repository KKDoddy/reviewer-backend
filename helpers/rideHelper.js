import { Op } from 'sequelize';
import models from '../models';

const { RideRequest, Ride } = models;

const createRideRequest = async (commuterId, driverId) => {
    return await Ride.create({
        commuterId,
        driverId,
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date()
    });
};

const findRideById = async (id) => {
    return await Ride.findOne({
        where: {
            id
        }
    });
};

const findRidesByUserId = async (idFieldName, userId) => {
    return await Ride.findAll({
        where: {
             [idFieldName]: userId
        }
    });
};

const updateRideStatus = async (id, newStatus) => {
    return await Ride.update({
        status: newStatus
    },
    {
        where: {
            id
        }
    });
};

const updateRideStart = async (id, startLocation, startTime) => {
    return await Ride.update({
        startLocation,
        startTime,
        status: 'EN-ROUTE'
    },
    {
        where: {
            id
        }
    });
};

const updateRideEnd = async (id, endLocation, endTime) => {
    return await Ride.update({
        endLocation,
        endTime,
        status: 'ENDED'
    },
    {
        where: {
            id
        }
    });
};

export {
    createRideRequest,
    findRideById,
    findRidesByUserId,
    updateRideStatus,
    updateRideStart,
    updateRideEnd
};
