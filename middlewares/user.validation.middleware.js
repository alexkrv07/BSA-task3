const { user } = require('../models/user');
const UserService = require('../services/userService');

const createUserValid = (req, res, next) => {
    if (!checkRequiredUserBodyFields(req)) {
        res.status(400).send({
            error: true,
            message: `User entity to create isn't valid, or ID is in User entity`
        });
    }

    if (!checkEmail(req)) {
        res.status(400).send({
            error: true,
            message: `User email must be only gmail`
        });
    }

    if (!checkName(req)) {
        res.status(400).send({
            error: true,
            message: `User firstName and  lastName must be not emty string`
        });
    }

    if (!checkPhoneNumber(req)) {
        res.status(400).send({
            error: true,
            message: `User phoneNumber must be format: +380xxxxxxxxx`
        });
    }

    if (!checkPassword(req)) {
        res.status(400).send({
            error: true,
            message: `User password must be string min 3 simbols`
        });
    }

    if (!checkSameEmail(req)) {
        res.status(400).send({
            error: true,
            message: `User email already exists`
        });
    }

    if (!checkSamePhoneNumber(req)) {
        res.status(400).send({
            error: true,
            message: `User phoneNumber already exists`
        });
    }

    next();
}

const updateUserValid = (req, res, next) => {
    if (!checkRequiredUserBodyFields(req)) {
        res.status(400).send({
            error: true,
            message: `User entity to create isn't valid, or ID is in User entity`
        });
    }

    if (!checkEmail(req)) {
        res.status(400).send({
            error: true,
            message: `User email must be only gmail`
        });
    }

    if (!checkName(req)) {
        res.status(400).send({
            error: true,
            message: `User firstName and  lastName must be not emty string`
        });
    }

    if (!checkPhoneNumber(req)) {
        res.status(400).send({
            error: true,
            message: `User phoneNumber must be format: +380xxxxxxxxx`
        });
    }

    if (!checkPassword(req)) {
        res.status(400).send({
            error: true,
            message: `User password must be string min 3 simbols`
        });
    }

    if (!checkSameEmailBelongSameUser(req)) {
        res.status(400).send({
            error: true,
            message: `User email already exists`
        });
    }

    if (!checkSamePhoneNumberBelongSameUser(req)) {
        res.status(400).send({
            error: true,
            message: `User phoneNumber already exists`
        });
    }

    next();
}

const validateUserExists = (req, res, next) => {
    const user = UserService.search( {id: req.params.userID });
    console.log(user)

    if (user) {
        next();
    } else {
        res.status(404).send({
            error: true,
            message: `User ${req.params.userID} not found`,
        });
    }
}


const checkRequiredUserBodyFields = (req) => {
    if (req.body && !req.body.id && req.body.firstName && req.body.lastName && req.body.email && req.body.phoneNumber && req.body.password) {
         return true;
    }
    return false;
}

const checkEmail = (req) => {
    const pattern = /^[a-zA-Z0-9]+@gmail.com$/;
    return pattern.test(req.body.email);
}

const checkName = (req) => {
    if (
        typeof req.body.firstName === 'string'
        && req.body.firstName.length
        && typeof req.body.lastName === 'string'
        && req.body.lastName.length
    ) {
        return true;
    }
    return false;
}

const checkPhoneNumber = (req) => {
    const pattern = /^\+380[0-9]{9}$/;
    return pattern.test(req.body.phoneNumber);
}

const checkPassword = (req) => {
    if (typeof req.body.password === 'string' && req.body.password.length >= 3) {
        return true;
    }
    return false;
}

const checkSameEmail = (req) => {
    const user = UserService.search( {email: req.body.email });
    if (user) {
        return false
    } else {
        return true;
    }
}

const checkSameEmailBelongSameUser = (req) => {
    const user = UserService.search( {email: req.body.email });
    if (user && user.id === req.params.userID) {
        return true;
    } else {
        return false;
    }
}

const checkSamePhoneNumber = (req) => {
    const user = UserService.search( {phoneNumber: req.body.phoneNumber });
    if (user) {
        return false
    } else {
        return true;
    }
}

const checkSamePhoneNumberBelongSameUser = (req) => {
    const user = UserService.search( {phoneNumber: req.body.phoneNumber });
    if (user && user.id === req.params.userID) {
        return true;
    } else {
        return false;
    }
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
exports.validateUserExists = validateUserExists
