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

export {
    validateRideAction
}