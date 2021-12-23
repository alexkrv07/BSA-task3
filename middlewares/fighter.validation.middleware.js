const { fighter } = require('../models/fighter');
const FighterService = require('../services/fighterService');

const createFighterValid = (req, res, next) => {
    if (!checkRequiredFighterBodyFields(req)) {
        res.status(400).send({
            error: true,
            message: `Fighter entity to create isn't valid, or ID is in Fighter entity`
        });
    }

    if (!checkName(req)) {
        res.status(400).send({
            error: true,
            message: `Fighter name be not emty string`
        });
    }

    if (!checkPower(req)) {
        res.status(400).send({
            error: true,
            message: `Fighter's power must be number from 1 to 100`
        });
    }

    if (!checkDefense(req)) {
        res.status(400).send({
            error: true,
            message: `Fighter's defense must be number from 1 to 10`
        });
    }

    if (!checkHealth(req)) {
        res.status(400).send({
            error: true,
            message: `Fighter's health must be number from 80 to 120`
        });
    }

    if (!checkSameName(req)) {
        res.status(400).send({
            error: true,
            message: `Fighter name already exists`
        });
    }
    next();
}

const updateFighterValid = (req, res, next) => {
    if (!checkRequiredFighterBodyFields(req)) {
        res.status(400).send({
            error: true,
            message: `Fighter entity to create isn't valid, or ID is in Fighter entity`
        });
    }

    if (!checkName(req)) {
        res.status(400).send({
            error: true,
            message: `Fighter name be not emty string`
        });
    }

    if (!checkPower(req)) {
        res.status(400).send({
            error: true,
            message: `Fighter's power must be number from 1 to 100`
        });
    }

    if (!checkDefense(req)) {
        res.status(400).send({
            error: true,
            message: `Fighter's defense must be number from 1 to 10`
        });
    }

    if (!checkHealth(req)) {
        res.status(400).send({
            error: true,
            message: `Fighter's health must be number from 80 to 120`
        });
    }

    if (!checkSameNameBelongSameUser(req)) {
        res.status(400).send({
            error: true,
            message: `Fighter name already exists`
        });
    }
    next();
}

const validateFighterExists = (req, res, next) => {
    const fighter = FighterService.search( {id: req.params.fighterID });

    if (fighter) {
        next();
    } else {
        res.status(404).send({
            error: true,
            message: `Fighter ${req.params.fighterID} not found`,
        });
    }
}

const checkRequiredFighterBodyFields = (req) => {
    if (req.body && !req.body.id && req.body.name && req.body.power && req.body.defense) {
         return true;
    }
    return false;
}

const checkName = (req) => {
    if (typeof req.body.name === 'string' && req.body.name.length) {
        return true;
    }
    return false;
}

const checkPower = (req) => {
    if (typeof req.body.power === 'number' && req.body.power >= 1 && req.body.power <= 100) {
        return true;
    }
    return false;
}

const checkDefense = (req) => {
    if (typeof req.body.defense === 'number' && req.body.defense >= 1 && req.body.defense <= 10) {
        return true;
    }
    return false;
}

const checkHealth = (req) => {
    if (!req.body.health) {
        req.body.health = 100;
        return true;
    }
    if (typeof req.body.health === 'number' && req.body.health >= 80 && req.body.health <= 120) {
        return true;
    }
    return false;
}

const checkSameName = (req) => {
    const fighter = FighterService.search( {name: req.body.name });
    if (fighter) {
        return false
    } else {
        return true;
    }
}

const checkSameNameBelongSameUser = (req) => {
    const fighter = FighterService.search( {name: req.body.name });
    if (fighter && fighter.id === req.params.fighterID) {
        return true;
    } else {
        return false;
    }
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
exports.validateFighterExists = validateFighterExists;
