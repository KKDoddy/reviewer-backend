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

export {
    isIdSafeInteger
};
