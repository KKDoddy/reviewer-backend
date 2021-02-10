import { findCooperativeById } from '../helpers/cooperativeHelper';

const validateCooperativeId = async (req, res, next) => {
    const { cooperativeId } = req.body;
    try {
        const cooperativeExists = await findCooperativeById(cooperativeId);
        if (cooperativeExists) {
            return next();
        }
        return res.status(404).json({
            status: 404,
            error: 'Cooperative not found.'
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error!!!!!!!!!!!!!!!'
        });
    }
};

export {
    validateCooperativeId
}
