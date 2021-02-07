import userHelper from '../helpers/userHelper';

const validateUniques = async (req, res, next) => {
    const { email, username } = req.body;
    const userExists = await userHelper.findUserByEmailAndOrUsername(email, username);
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
        }
        return res.status(409).json({ status: 409,
            error: 'The provided email is already in use, verify your email and try again.'
        });
    }
    return next();
};

export default validateUniques;