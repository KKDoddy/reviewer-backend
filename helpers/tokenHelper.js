import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../models';

const { Token } = models;


dotenv.config();

const generateToken = ({ username, role }) => {
    const generatedToken = jwt.sign({ username, role }, process.env.JWT_SECRET);
    return generatedToken;
};

const getToken = async ({ username, role, id }) => {
    const tokenExists = await Token.findOne({
        where: {
            userId: id
        }
    });
    if (tokenExists) {
        return tokenExists.tokenValue;
    }
    const generatedToken = generateToken({username, role});
    await Token.create({
        userId: id,
        tokenValue: generatedToken,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    return generatedToken; 
};

const destroyToken = async (token) => {
    const deletedToken = await Token.destroy({ where: { tokenValue: token } });
    return deletedToken;
};

export { generateToken, getToken, destroyToken };
