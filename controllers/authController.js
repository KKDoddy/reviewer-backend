import userHelper from '../helpers/userHelper';
import { checkPassword } from '../helpers/hasher';
import { getToken, destroyToken } from '../helpers/tokenHelper';

const signup = async (req, res) => {
    try {
        await userHelper.saveUser(req.body);
        return res.status(201).json({ status: 201, message: 'account successfully created' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'unable to create account' })
    }
};

const signin = async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    const userExists = await userHelper.findUserByUsernameOrEmail(usernameOrEmail);
    if (userExists && await checkPassword(password, userExists.salt, userExists.password)) {
        const token = await getToken({username: userExists.username, role: userExists.role, id: userExists.id});
        return res.status(200).json({ status: 200, data: { token } });
    }
    res.status(401).json({ status: 401, error: 'incorrect username/email or password' });
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
        console.log(error);
        return res.status(500).json({ status: 500, error: 'database error' });
    }
};

export default { signup, signin, logout };