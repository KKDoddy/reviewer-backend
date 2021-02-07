import { validationResult } from 'express-validator';
import { saveCooperative, findCooperativeById, findAllCooperatives, findCooperativesByKeyWord } from '../helpers/cooperativeHelper';
import { findUserBy } from '../helpers/userHelper';

const createCooperative = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ status: 422, errors });
    }
    try {
        const {name, email, phone, managerId} = req.body;
        const managerExists = await findUserBy('id', managerId);
        if (managerExists) {
            const savedCooperative = await saveCooperative(name, email, phone, managerId);
            return res.status(200).json({
                status: 200,
                details: savedCooperative,
                message: 'welcome to the register new cooperative route'
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'manager not found',
            field: 'managerId'
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error, couldn\'t process request' 
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
