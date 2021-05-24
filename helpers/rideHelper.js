import { Op } from 'sequelize';
import models from '../models';

const { Ride, User, Review } = models;

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
    const rides = await Ride.findAll({
        where: {
             [idFieldName]: userId
        },
        include: [
            { model: User, as: 'commuter', attributes: [ 'id', 'name', 'username', 'phoneNumber', 'profilePhoto' ] },
            { model: User, as: 'driver', attributes: [ 'id', 'name', 'username', 'phoneNumber', 'profilePhoto' ] },
            {model: Review, as: 'review' }
        ]
    });
    return rides;
};

const updateRideStatus = async (id, newStatus) => {
    return await Ride.update({
        status: newStatus
    },
    {
        where: {
            id
        },
        returning: true,
        plain: true
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
        },
        returning: true,
        plain: true
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
        },
        returning: true,
        plain: true
    });
};

const findUserRecentRide = async (userIdFieldName, userId) => {

    return await Ride.findAll({
        limit: 1,
        where: {
            [userIdFieldName]: userId
        },
        order: [ [ 'createdAt', 'DESC' ]]
    });
};

export {
    createRideRequest,
    findRideById,
    findRidesByUserId,
    updateRideStatus,
    updateRideStart,
    updateRideEnd,
    findUserRecentRide
};
