const { body, param, query } = require("express-validator");

const validateBody = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("Название книги должно иметь длину больше 2 символов."),
  body("author")
    .isLength({ min: 3 })
    .withMessage("Имя автора должно иметь длину больше 2 символов."),
  body("publicationYear")
    .isNumeric()
    .withMessage("Год публикации задан неверно."),
  body("pagesNumber")
    .isNumeric()
    .withMessage("Количество страниц задано неверно."),
];

const validateTitle = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("Название книги должно иметь длину больше 2 символов."),
];

const validateParamId = [
  param("id").isLength({ min: 1 }).withMessage("Id задания слишком короткий."),
];

const validateQuery = [
  query("title")
    .isLength({ min: 3 })
    .optional()
    .withMessage("Название книги должно иметь длину больше 2 символов."),
  query("author")
    .isLength({ min: 3 })
    .optional()
    .withMessage("Имя автора должно иметь длину больше 2 символов."),
  query("page").isNumeric().optional().withMessage("Страница - целое число."),
];

module.exports = {
  validateBody,
  validateTitle,
  validateParamId,
  validateQuery,
};
