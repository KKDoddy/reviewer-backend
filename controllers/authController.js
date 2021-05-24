import { saveUser, findUserByUsernameOrEmail, processSocialAuthUserData, findUserByRoleAndCooperativeId, updateUser } from '../helpers/userHelper';
import { checkPassword } from '../helpers/hasher';
import { getToken, destroyToken } from '../helpers/tokenHelper';

const signup = async (req, res) => {
    try {
        req.body.role = 'COMMUTER';
        const saved = await saveUser({ ...req.body, isVerified: false });
        return res.status(201).json({ status: 201, message: 'account successfully created' });
    } catch (error) {
        return res.status(500).json({ status: 500, error: 'unable to create account' });
    }
};

const signin = async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    const userExists = await findUserByUsernameOrEmail(usernameOrEmail);
    if (userExists && await checkPassword(password, userExists.salt, userExists.password)) {
        const token = await getToken({ role: userExists.role, id: userExists.id});
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
    try {
        const alreadyManaged = await findUserByRoleAndCooperativeId('MANAGER', req.body.cooperativeId);
        if (alreadyManaged) {
            return res.status(403).json({
                status: 403,
                error: 'The cooperative already has a manager'
            });
        }
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
        return res.status(500).json({ status: 500, error: 'Server error! Unable to create account.' });
    }
};

const driverSignup = async (req, res) => {
    try {
        req.body.role = 'DRIVER';
        req.body.cooperativeId = req.user.cooperativeId;
        const saved = await saveUser({ ...req.body, isVerified: false, reviewCount: 0, cummulativeRating: 0 });
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

const updateProfile = async (req, res) =>{
    try {
        const { id } = req.user;
        const { name, username, phoneNumber, gender, birthdate } = req.body;
        const updated = await updateUser({ name, username, phoneNumber, gender, birthdate, id });
        return res.status(201).json({
            status: 201,
            message: 'user profile updated successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'unable to create account' });
    }
};

export default {
    signup,
    signin,
    logout,
    handleSocialAuth,
    managerSignup,
    driverSignup,
    updateProfile
};