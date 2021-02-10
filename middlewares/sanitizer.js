const isIdSafeInteger = (req, res, next) => {
    let { id } = req.params;
    
    if (!isNaN(id) && Number.isSafeInteger(Number(id))) {
        return next();
    }
    return res.status(409).json({
        status: 409,
        error: 'The provided resource\'s id is invalid!'
    });
};

const prepIdForValidations = (req, res, next) => {
    const { rideId, cooperativeId } = req.body;
    if (rideId) {
        req.params.id = rideId;
    }
    else if (cooperativeId) {
        req.params.id = cooperativeId;
    }
    return next();
};

export {
    isIdSafeInteger,
    prepIdForValidations
};
