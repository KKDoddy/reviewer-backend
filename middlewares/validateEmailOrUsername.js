import { findUserByEmailAndOrUsernameAndPhoneNumber, findUserBy } from '../helpers/userHelper';

const validateUniques = async (req, res, next) => {
    const { email, username, phoneNumber } = req.body;
    const userExists = await findUserByEmailAndOrUsernameAndPhoneNumber(email, username, phoneNumber);
    if (userExists.length) {
        if (userExists.length === 2 || (userExists[0].username === username && userExists[0].email === email)) {
            return res.status(409).json({ status: 409,
                error: 'The provided email and username are already in use, verify your email and username and try again.'
            });
        }
        else if (userExists[0].username === username) {
            return res.status(409).json({ status: 409,
                error: 'The provided username is already in use, verify your username and try again.'
            });
        } else if (userExists[0].phoneNumber === phoneNumber) {
            return res.status(409).json({ status: 409,
                error: 'The provided phone number is already in use, verify your phone number and try again.'
            });
        }
        return res.status(409).json({ status: 409,
            error: 'The provided email is already in use, verify your email and try again.'
        });
    }
    return next();
};

const validateUpdateUniques = async (req, res, next) => {
    const { username: oldUsername, phoneNumber: oldPhoneNumber } = req.user;
    const { username: newUsername, phoneNumber: newPhoneNumber } = req.body;
    if (oldUsername === newUsername && oldPhoneNumber === newPhoneNumber) {
        return next();
    }
    if (oldUsername !== newUsername && oldPhoneNumber === newPhoneNumber) {
        const usernameExists = await findUserBy('username', newUsername);
        if (usernameExists) {
            return res.status(409).json({
                status: 409,
                error: 'The provided username is already in use, verify your username and try again.'
            });
        } else {
            return next();
        }
    }
    if (oldUsername === newUsername && oldPhoneNumber !== newPhoneNumber ) {
        const phoneNumberExists = await findUserBy('phoneNumber', newPhoneNumber);
        if (phoneNumberExists) {
            return res.status(409).json({ status: 409,
                error: 'The provided phone number is already in use, change your the provided phone number and try again.',
                fields: ['phoneNumber']
            });
        }
        return next();
    }
    const phoneNumberExists = await findUserBy('phoneNumber', newPhoneNumber);
    const usernameExists = await findUserBy('username', newUsername);
    if (phoneNumberExists && usernameExists) {
        return res.status(409).json({ status: 409,
            error: 'The provided username and phone number are already in use, change your username and phone number then try again.',
            fields: ['username', 'phoneNumber']
        });
    }
    return next();
};

export {validateUniques, validateUpdateUniques};