import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return { salt, hashedPassword };
};

const checkPassword = async (password, salt, hashedPassword) => {
    const claimed = await bcrypt.hash(password, salt);
    if(claimed === hashedPassword){
        return true;
    }
    return false;
};

export { hashPassword, checkPassword };
