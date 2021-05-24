
const isOperator = (req, res, next) => {
    if (req.user.role === 'OPERATOR') {
        return next();
    }
    return res.status(401).json({
        status: 401,
        message: 'Sorry, you are not authorized to access this route.'
    });
};

const isManager = (req, res, next) => {
    if (req.user.role === 'MANAGER') {
        return next();
    }
    return res.status(401).json({
        status: 401,
        message: 'Sorry, you are not authorized to access this route.'
    });
};

const isCommuter = (req, res, next) => {
    if (req.user.role === 'COMMUTER') {
        return next();
    }
    return res.status(401).json({
        status: 401,
        message: 'Sorry, you are not authorized to access this route.'
    });
};

const isDriver = (req, res, next) => {
    if (req.user.role === 'DRIVER') {
        return next();
    }
    return res.status(401).json({
        status: 401,
        message: 'Sorry, you are not authorized to access this route.'
    });
};

const canViewReviews = (req, res, next) => {
    const { role } = req.user;
    if (role === 'COMMUTER' || role === 'DRIVER' || role === 'MANAGER') {
        return next();
    }
    return res.status(401).json({
        status: 401,
        message: 'Sorry, you are not authorized to access this route.'
    });
}

const isDriverOrCommuter = (req, res, next) => {
    const { role } = req.user;
    if (role === 'COMMUTER' || role === 'DRIVER') {
        return next();
    }
    return res.status(401).json({
        status: 401,
        message: 'Sorry, you are not authorized to access this route.'
    });
}

export {
    isOperator,
    isManager,
    isCommuter,
    isDriver,
    canViewReviews,
    isDriverOrCommuter
};
