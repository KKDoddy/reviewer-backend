import { saveMotorVehicle,
    findMotorVehicleById,
    findAllMotorVehicles,
    findMotorVehiclesByKeyWord,
    findMotorVehicleByPlateNumber } from '../helpers/motorVehicleHelper';
import { findUserByRoleAndId } from '../helpers/userHelper';

const createMotorVehicle = async (req, res) => {
    const { plateNumber } = req.body;
    const numbers = plateNumber.substr(2,3);

    if (numbers == '000') {
        return res.status(422).json({
            status: 422,
            error: 'Invalid plate number',
            value: plateNumber
        });
    }
    const motorVehicleExists = await findMotorVehicleByPlateNumber(plateNumber);
    if (motorVehicleExists) {
        return res.status(422).json({
            status: 422,
            error: `Motor vehicle with plate number '${plateNumber}' is already registered`,
            value: plateNumber
        });
    }
    try {
        const {plateNumber, driverId, owner} = req.body;
        const driverExists = await findUserByRoleAndId('DRIVER', driverId);
        if (driverExists) {
            const savedMotorVehicle = await saveMotorVehicle(plateNumber, driverId, owner);
            return res.status(200).json({
                status: 200,
                details: savedMotorVehicle,
                message: 'New motor-vehicle save successfuly'
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'driver not found',
            field: 'driverId'
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error, couldn\'t process request'
        });
    }
};

const viewSingleMotorVehicle = async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    try {
        const foundMotorVehicle = await findMotorVehicleById(id);
        if (foundMotorVehicle) {
            return res.status(200).json({
                status: 200,
                data: foundMotorVehicle
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'Motor-vehicle not found'
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error!'
        });
    }
};

const viewAllMotorVehicles = async (req, res) => {
    try {
        const foundMotorVehicles = await findAllMotorVehicles();
        if (foundMotorVehicles.length) {
            return res.status(200).json({
                status: 200,
                data: foundMotorVehicles
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'No motor-vehicles were found!'
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: 'Server error!'
        });
    }
};

const searchMotorVehicles = async (req, res) => {
    const { key } = req.params;
    try {
        const foundMotorVehicles = await findMotorVehiclesByKeyWord(key);
        if (foundMotorVehicles.length) {
            return res.status(200).json({
                status: 200,
                data: foundMotorVehicles
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'No match was found!'
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error!'
        });
    }
};

export {
    createMotorVehicle,
    viewSingleMotorVehicle,
    viewAllMotorVehicles,
    searchMotorVehicles
}
