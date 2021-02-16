import { saveCooperative, findCooperativeById, findAllCooperatives, findCooperativesByKeyWord, findDuplicates } from '../helpers/cooperativeHelper';
import { findUserByRoleAndId } from '../helpers/userHelper';

const createCooperative = async (req, res) => {
    try {
        const {name, email, phone} = req.body;
        const cooperativeExists = await findDuplicates(name,email,phone);
        
        if (cooperativeExists) {
            const errors = [];
            if (name === cooperativeExists.name) {
                errors[errors.length] = {
                    field: 'name',
                    error: 'Another Cooperative with the same name already exists'
                };
            }
            if (email === cooperativeExists.email) {
                errors[errors.length] = {
                    field: 'email',
                    error: 'Another Cooperative with the same email already exists'
                };
            }
            if (phone === cooperativeExists.phone) {
                errors[errors.length] = {
                    field: 'phone',
                    error: 'Another Cooperative with the same phone already exists'
                };
            }
            return res.status(409).json({
                status: 409,
                errors
            });
        }

        const savedCooperative = await saveCooperative(name, email, phone);
        return res.status(200).json({
            status: 200,
            details: savedCooperative,
            message: 'welcome to the register new cooperative route'
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error! Couldn\'t process request' 
        });
    }
};

const viewSingleCooperative = async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    try {
        const foundCooperative = await findCooperativeById(id);
        if (foundCooperative) {
            return res.status(200).json({
                status: 200,
                object: foundCooperative
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'cooperative not found'
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error!'
        });
    }
};

const viewAllCooperatives = async (req, res) => {
    try {
        const foundCooperatives = await findAllCooperatives();
        if (foundCooperatives.length) {
            return res.status(200).json({
                status: 200,
                objects: foundCooperatives
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'No cooperatives were found!'
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: 'Server error!'
        });
    }
};

const searchCooperatives = async (req, res) => {
    const { key } = req.params;
    try {
        const foundCooperatives = await findCooperativesByKeyWord(key);
        if (foundCooperatives.length) {
            return res.status(200).json({
                status: 200,
                objects: foundCooperatives
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
    createCooperative,
    viewSingleCooperative,
    viewAllCooperatives,
    searchCooperatives
}
