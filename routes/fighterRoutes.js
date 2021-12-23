const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid, validateFighterExists } = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.route('/')
  .get(FighterService.getAll)
  .post(createFighterValid, FighterService.createFighter);

router.route('/:fighterID')
  .all(validateFighterExists)
  .get(FighterService.getById)
  .put(updateFighterValid, FighterService.putById)
  .delete(FighterService.deleteById);

module.exports = router;
