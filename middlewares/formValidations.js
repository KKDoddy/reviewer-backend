import { check } from 'express-validator';

const name = check('name', 'name is required and sould be at least be 3 charaters long')
    .isString()
    .isLength({ min: 3 });

const email = check('email', 'invalid email address')
    .exists().withMessage('email required')
    .trim()
    .isEmail()
    .normalizeEmail();

const phone = check('phone', 'Phone number must be 10 numeric digits and start with 078 or 073.')
    .exists()
    .trim()
    .isNumeric()
    .matches(/^07[3,8][0-9]{7}/);

const userId = (role) => check(role, `a valid ${role} is required.`)
    .exists()
    .trim()
    .isNumeric();

const username = check('username')
    .exists()
    .withMessage('username is required')
    .isAlphanumeric()
    .withMessage('special characters are not allowed')
    .isLength({ min: 3 })
    .withMessage('username should atleat have 3 characters');

const password = (passwordFieldName) => check(passwordFieldName, 'password should be atleast 8 characters long; must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, but cannot contain whitespace.')
    .exists()
    .isString()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])(?=.{8,})/);

const gender = check('gender', 'the gender field is required')
    .exists()
    .matches(new RegExp('^male$|^female$', 'i'))
    .withMessage('field sould be male or female');

const justAnotherString = (fieldName) => check(fieldName, `${fieldName} is required`).exists().not().isEmpty().isString();

const signupValidator = [
    name,
    username,
    email,
    password('password'),
    gender
];

const managerSignupValidator = [
    username,
    name,
    email,
    password('password'),
    gender
];

const signinValidator = [
    justAnotherString('usernameOrEmail'),
    justAnotherString('password')
];

const cooperativeValidator = [
    name,
    email,
    phone,
    userId('managerId')
];

export {
    signupValidator,
    signinValidator,
    managerSignupValidator,
    cooperativeValidator
};
