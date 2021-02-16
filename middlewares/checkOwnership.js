import { findRideById } from '../helpers/rideHelper';

const isDriverRideOwner = async (req, res, next) => {
    const driverId = req.user.id;
    let { id } = req.params;
    id = Number(id);
    const rideExists = await findRideById(id);
    if (rideExists) {
        if (rideExists.driverId === driverId) {
            req.rideExists = rideExists
            return next();
        }
        return res.status(401).json({
            status: 401,
            error: 'Not authorized!'
        });
    }
    return res.status(404).json({
        status: 404,
        error: 'Ride not found'
    });
};

const isCommuterRideOwner = async (req, res, next) => {
    const commuterId = req.user.id;
    let { id } = req.params;
    id = Number(id);
    const rideExists = await findRideById(id);
    if (rideExists) {
        if (rideExists.commuterId === commuterId) {
            req.rideExists = rideExists
            return next();
        }
        return res.status(401).json({
            status: 401,
            error: 'Not authorized!'
        });
    }
    return res.status(404).json({
        status: 404,
        error: 'Ride not found'
    });
};

export {
    isDriverRideOwner,
    isCommuterRideOwner
}
