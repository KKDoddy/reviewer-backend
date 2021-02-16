import { check, validationResult } from 'express-validator';

const name = check('name', 'name is required and sould be at least be 3 charaters long')
    .exists()
    .notEmpty()
    .trim()
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

const plateNumber = check('plateNumber')
    .exists()
    .notEmpty()
    .trim()
    .matches(/^R[A-Z][0-9]{3}[A-Z]/);

const entityId = (idName) => check(idName, `a valid ${idName} is required.`)
    .exists()
    .notEmpty()
    .trim()
    .isNumeric();

const username = check('username')
    .exists()
    .notEmpty()
    .trim()
    .withMessage('username is required')
    .isAlphanumeric()
    .withMessage('special characters are not allowed')
    .isLength({ min: 3 })
    .withMessage('username should atleat have 3 characters');

const password = (passwordFieldName) => check(passwordFieldName, 'password should be atleast 8 characters long; must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, but cannot contain whitespace.')
    .exists()
    .notEmpty()
    .trim()
    .isString()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])(?=.{8,})/);

const gender = check('gender', 'the gender field is required')
    .exists()
    .notEmpty()
    .trim()
    .matches(new RegExp('^male$|^female$', 'i'))
    .withMessage('field sould be male or female');

const rateField = (fieldName) => check(fieldName)
    .exists()
    .notEmpty()
    .trim()
    .matches(/^[1-5]{1}/)
    .withMessage(`${fieldName} should either be 1, 2, 3, 4 or 5`);

const justAnotherString = (fieldName) => check(fieldName, `${fieldName} is required`).exists().not().isEmpty().isString().isLength({ min: 3 });

const locationFieldValidation = (fieldName) => check(fieldName, `${fieldName} is required and should be a valid location`).exists().notEmpty().isLatLong();

const dateTimeFieldValidation = (fieldName) => check(fieldName, `${fieldName} is required and should be of DateTime format`).exists().notEmpty().trim().toDate()

const signupValidator = [
    name,
    username,
    email,
    password('password'),
    gender
];

const coopMemberSignupValidator = [
    username,
    name,
    email,
    password('password'),
    gender,
    entityId('cooperativeId')
];

const signinValidator = [
    justAnotherString('usernameOrEmail'),
    justAnotherString('password')
];

const cooperativeValidator = [
    name,
    email,
    phone
];

const motorVehicleInfoValidator = [
    plateNumber,
    entityId('driverId'),
    justAnotherString('owner'),
];

const validateRideStartInfo = [
    locationFieldValidation('startLocation'),
    dateTimeFieldValidation('startTime')
];

const validateRideEndInfo = [
    locationFieldValidation('endLocation'),
    dateTimeFieldValidation('endTime')
];

const reviewValidator = [
    justAnotherString('comment'),
    rateField('hygieneRating'),
    rateField('roadSafetyRating'),
    rateField('professionalismRating'),
    entityId('rideId')
];

const validateForm = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: 422,
            errors
        });
    }
    return next();
};

export {
    validateForm,
    signupValidator,
    signinValidator,
    coopMemberSignupValidator,
    cooperativeValidator,
    motorVehicleInfoValidator,
    validateRideStartInfo,
    validateRideEndInfo,
    reviewValidator,
};
