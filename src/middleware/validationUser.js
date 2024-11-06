const { body, param, query } = require("express-validator");

// Middleware для валидации данных
const validateBodyUser = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Имя пользователя должно содержать больше 2 символов."),
  body("email").isEmail().withMessage("Email указан неверно."),
];

const validateParamId = [
  param("id")
    .isLength({ min: 1 })
    .withMessage("Id пользователя слишком короткий."),
];

const validateBodyName = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Имя пользователя должно содержать больше 2 символов."),
];

const validateQueryPage = [
  query("page").isNumeric().optional().withMessage("Страница - целое число."),
];

module.exports = {
  validateBodyUser,
  validateParamId,
  validateBodyName,
  validateQueryPage,
};
