import { validationResult } from 'express-validator';
import { saveUser, findUserByUsernameOrEmail, processSocialAuthUserData } from '../helpers/userHelper';
import { checkPassword } from '../helpers/hasher';
import { getToken, destroyToken } from '../helpers/tokenHelper';

// const response = ({ status, message, error, object }) => {
//     if (error) {
//         return re
//     }
// };

const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ status: 422, errors });
    }
    try {
        req.body.role = 'COMMUTER';
        const saved = await saveUser({ ...req.body, isVerified: false });
        return res.status(201).json({ status: 201, message: 'account successfully created' });
    } catch (error) {
        return res.status(500).json({ status: 500, error: 'unable to create account' });
    }
};

const signin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ status: 422, errors });
    }
    const { usernameOrEmail, password } = req.body;
    const userExists = await findUserByUsernameOrEmail(usernameOrEmail);
    if (userExists && await checkPassword(password, userExists.salt, userExists.password)) {
        const token = await getToken({username: userExists.username, role: userExists.role, id: userExists.id});
        return res.status(200).json({ status: 200, data: { token } });
    }
    return res.status(401).json({ status: 401, error: 'incorrect username/email or password' });
};

const logout = async (req, res) => {
    const access_token = req.header('access_token');
    try {
        const result = await destroyToken(access_token);
        if(result){
            return res.status(200).json({ status: 200, message: 'user logged out successfully' });
        }
        return res.status(500).json({ status: 500, error: 'unexpected error while processing token' });
    } catch (error) {
        return res.status(500).json({ status: 500, error: 'database error' });
    }
};

const handleSocialAuth = async (req, res) => {
    const { isNew, user, error } = await processSocialAuthUserData(req.user);
    if (isNew) {
      if (!error) {
        const toSave = {
            name: user.name,
            email: user.email,
            username: user.username,
            socialId: user.socialId,
            profilePhoto: user.profilePhoto,
            provider: user.provider,
            password: null,
            gender: undefined,
            birthDate: undefined
        };
        const newUser = await saveUser({ ...toSave, isVerified: true });
        const token = await getToken({ username: newUser.username, role: newUser.role, id: newUser.id });
        return res.status(201).json({ status: 201, token });
      } else {
        return res.status(500).json({ status: 500, error });
      }
    } else {
        const token = await getToken({ username: user.username, role: user.role, id: user.id });
        return res.status(200).json({ status: 200, token });
    }
};

const managerSignup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ status: 422, errors });
    }
    try {
        req.body.role = 'MANAGER';
        const saved = await saveUser({ ...req.body, isVerified: false });
        return res.status(201).json({ status: 201,
            message: 'account successfully created',
            accountInfo: {
                username: saved.username,
                name: saved.name,
                email: saved.gender,
                gender: saved.gender
            } });
    } catch (error) {
        return res.status(500).json({ status: 500, error: 'unable to create account' });
    }
};

export default { signup, signin, logout, handleSocialAuth, managerSignup };