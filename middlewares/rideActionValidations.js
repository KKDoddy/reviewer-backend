import { findUserRecentRide } from '../helpers/rideHelper';

const validateRideAction = (req, res, next) => {
    const {url, rideExists} = req;
    if ((rideExists.status === 'PENDING' || rideExists.status === 'APPROVED') && url.endsWith('start')) {
        return next();
    }
    if (rideExists.status === 'EN-ROUTE' && url.endsWith('end')) {
        return next();
    }
    if ((rideExists.status === 'PENDING' || rideExists.status === 'DENIED') && url.endsWith('approve')) {
        return next();
    }
    if (rideExists.status === 'PENDING' && url.endsWith('deny')) {
        return next();
    }
    return res.status(403).json({
        status: 403,
        error: `Sorry! cannot ${url.split("/")[2]} a ride with status: ${rideExists.status}.`
    });
};

const hasNoRecentRide = async (req, res, next) => {
    const foundRide = await findUserRecentRide('commuterId', req.user.id);
    if (foundRide.length) {
        const { createdAt, status } = foundRide[0];
        const createdTime = createdAt.getTime();
        const nowTime = new Date().getTime();
        const difference = nowTime - createdTime;
        if (status === 'PENDING' && difference < 3600000) {
            return res.status(422).json({
                status: 422,
                error: `There is a pending request awaiting decision. Try again after: ${Math.round(((3600000-difference)/60000))} minutes` 
             });
        }
        return next();
    }
    return next();
};

export {
    validateRideAction,
    hasNoRecentRide
}