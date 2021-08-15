import { findMotorVehicleByFieldName } from '../helpers/motorVehicleHelper';

const checkDriver = async (req, res, next) => {
    const { driverId } = req.body;
    console.log(driverId);
    try {
        const driverOwnsOne = await findMotorVehicleByFieldName('driver', driverId);
        if(driverOwnsOne) {
            return res.status(400).json({
                status: 400,
                error: 'driver already has a motor vehicle'
            });
        }
        return next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            error: 'server error'
        });
    }
};

export { checkDriver };
