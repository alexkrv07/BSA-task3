const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid, validateUserExists } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.route('/')
  .get(UserService.getAll)
  .post(createUserValid, UserService.createUser);

router.route('/:userID')
  // .all(validateUserExists)
  .get(UserService.getById)
  .put(updateUserValid, UserService.putById)
  .delete(UserService.deleteById);

module.exports = router;
