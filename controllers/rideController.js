import {
    createRideRequest,
    findRideById,
    updateRideStatus,
    updateRideStart,
    updateRideEnd,
    findRidesByUserId
} from '../helpers/rideHelper';
import { findUserByRoleAndId } from '../helpers/userHelper';
import { drivers } from '../helpers/socketHelper';
import { serverSocket } from '../app';

const saveRideRequest = async (req, res) => {
    try {
        const { id } = req.user;
        const { driverId } = req.body;
        const driverExists = await findUserByRoleAndId('DRIVER', driverId);
        if (driverExists) {
            const savedRideRequest = await createRideRequest(id, driverId);
            const connectedDriver = await drivers.find(driver => driver.id === Number(driverId));
            if (connectedDriver) {
                const rideDetails = await findRidesByUserId('id', savedRideRequest.id);
                serverSocket.to(connectedDriver.connectionId).emit('newRequest', rideDetails);
            }
            return res.status(201).json({
                status: 201,
                message: 'Ride request created successfully',
                data: savedRideRequest
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'Driver with the given id does not exist'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            error: 'Server error!'
        });
    }

};

const approveRideRequest = async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    const rideRequestExists = await findRideById(id);
    if (rideRequestExists) {
        const updatedRideRequest = await updateRideStatus(id, 'APPROVED');
        return res.status(201).json({
            status: 201,
            message: 'request updated successfuly',
            data: updatedRideRequest[1].dataValues
        });
    }
    return res.status(404).json({
        status: 404,
        error: 'ride request not found!'
    });
};

const denyRideRequest = async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    const rideRequestExists = await findRideById(id);
    if (rideRequestExists) {
        const updatedRideRequest = await updateRideStatus(id, 'DENIED');
        return res.status(201).json({
            status: 201,
            message: 'request updated successfuly',
            data: updatedRideRequest[1].dataValues
        });
    }
    return res.status(404).json({
        status: 404,
        error: 'ride request not found!'
    });
};

const saveRideStart = async (req, res) => {
    try {
        const { startLocation, startTime } = req.body;
        let { id } = req.params;
        id = Number(id);
        const updatedRide = await updateRideStart(id, startLocation, startTime);
        return res.status(201).json({
            status: 201,
            message: 'Ride start recorded successfuly.',
            data: updatedRide[1].dataValues
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error!'
        });
    }
};

const saveRideEnd = async (req, res) => {
    try {
        const { rideExists } = req;
        const { endLocation, endTime } = req.body;
        let { id } = req.params;
        id = Number(id);
        if (!(rideExists.startTime < endTime)) {
            return res.status(403).json({
                status: 403,
                error: '!!!! Time travel !!!! Ride end-time must be newer to the ride start-time.',
                recordedStartTime: rideExists.startTime,
                providedEndTime: endTime
            });
        }
        const updatedRide = await updateRideEnd(id, endLocation, endTime);
        return res.status(201).json({
            status: 201,
            message: 'Ride end recorded successfuly.',
            data: updatedRide[1].dataValues
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error!'
        });
    }
};

const viewMyRides = async (req, res) => {
    const { id, role, name } = req.user;
    const idFieldName = role === 'DRIVER' ? 'driverId' : 'commuterId';
    const rides = await findRidesByUserId(idFieldName, id);
    if(rides.length) {
        return res.status(200).json({
            status: 200,
            data: rides
        });
    }
    return res.status(200).json({
        status: 200,
        data: []
    });
};

export {
    saveRideRequest,
    approveRideRequest,
    denyRideRequest,
    saveRideStart,
    saveRideEnd,
    viewMyRides
}