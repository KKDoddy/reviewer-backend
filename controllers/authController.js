import { saveUser, findUserByUsernameOrEmail, processSocialAuthUserData, findUserByRoleAndCooperativeId, updateUser } from '../helpers/userHelper';
import { checkPassword } from '../helpers/hasher';
import { getToken, destroyToken } from '../helpers/tokenHelper';
import { uploadToCloudinary } from '../helpers/cloudinaryHelper';

const signup = async (req, res) => {
    try {
        req.body.role = 'COMMUTER';
        if(req.body.gender.toUpperCase() === 'MALE') {
            req.body.profilePhoto = 'https://st.depositphotos.com/1779253/5140/v/600/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg';
        } else {
            req.body.profilePhoto = 'https://media.gettyimages.com/photos/female-portrait-icon-as-avatar-or-profile-picture-picture-id477333976?b=1&k=6&m=477333976&s=170667a&w=0&h=9dHk-S1AJ8BRZu0SWPOG0oQNWoJN0IKuSYEv7Hk64aM=';
        }
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
                errors: {errors: [{
                    msg: `The selected cooperative already has a manager`,
                    param: 'cooperativeId',
                    value: req.body.cooperativeId
                }]}
            });
        }
        req.body.role = 'MANAGER';
        if(req.body.gender.toUpperCase() === 'MALE') {
            req.body.profilePhoto = 'https://st.depositphotos.com/1779253/5140/v/600/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg';
        } else {
            req.body.profilePhoto = 'https://media.gettyimages.com/photos/female-portrait-icon-as-avatar-or-profile-picture-picture-id477333976?b=1&k=6&m=477333976&s=170667a&w=0&h=9dHk-S1AJ8BRZu0SWPOG0oQNWoJN0IKuSYEv7Hk64aM=';
        }
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
        if(req.body.gender.toUpperCase() === 'MALE') {
            req.body.profilePhoto = 'https://st.depositphotos.com/1779253/5140/v/600/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg';
        } else {
            req.body.profilePhoto = 'https://media.gettyimages.com/photos/female-portrait-icon-as-avatar-or-profile-picture-picture-id477333976?b=1&k=6&m=477333976&s=170667a&w=0&h=9dHk-S1AJ8BRZu0SWPOG0oQNWoJN0IKuSYEv7Hk64aM=';
        }
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
        let profilePhoto = null;
        if(req.files && req.files.profilePhoto[0]){
            const uploadedImage = await uploadToCloudinary(req.files.profilePhoto[0]);
            profilePhoto = uploadedImage.replace('http', 'https');
        }
        const { id } = req.user;
        const { name, username, phoneNumber, gender, birthdate } = req.body;
        const updated = await updateUser({ name, username, phoneNumber, gender, birthdate, profilePhoto, id });
        return res.status(201).json({
            status: 201,
            message: 'user profile updated successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'unable to update account' });
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