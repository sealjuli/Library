const express = require("express");
const router = express.Router();

const BooksControllers = require("../controllers/booksControllers");
const validationMiddleware = require("../middleware/validationBook");

/**
 * @swagger
 * /api/books/count:
 *   get:
 *     summary: Получить количество книг
 *     description: Получение количества книг в системе
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Количество книг
 */
router.get("/count", BooksControllers.getBooksCount);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Получить список книг с пагинацией
 *     description: Получение списка книг из базы данных
 *     tags:
 *       - Books
 *     parameters:
 *       - in: query
 *         name: author
 *         required: false
 *         schema:
 *           type: string
 *         description: Автор книги
 *       - in: query
 *         name: title
 *         required: false
 *         schema:
 *           type: string
 *         description: Название книги
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: string
 *         description: Страница
 *     responses:
 *       200:
 *         description: Массив книг
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 94c7e23a-0474-4d7c-979c-d647e70df3b5
 *         title:
 *           type: string
 *           example: Война и мир
 *         author:
 *           type: string
 *           example: Л.Н. Толстой
 *         publicationYear:
 *           type: integer
 *           example: 1900
 *         pagesNumber:
 *           type: integer
 *           example: 500000
 */
router.get("/", validationMiddleware.validateQuery, BooksControllers.getBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Получить конкретную книгу
 *     description: Получение конкретную книгу по id из базы данных
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Идентификатор книги
 *     responses:
 *       200:
 *         description: Информация о книге
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 94c7e23a-0474-4d7c-979c-d647e70df3b5
 *         title:
 *           type: string
 *           example: Война и мир
 *         author:
 *           type: string
 *           example: Л.Н. Толстой
 *         publicationYear:
 *           type: integer
 *           example: 1900
 *         pagesNumber:
 *           type: integer
 *           example: 500000
 */
router.get(
  "/:id",
  validationMiddleware.validateParamId,
  BooksControllers.getBookById
);

/**
 * @swagger
 * /api/books:
 *    post:
 *      summary: Добавить новую книгу
 *      description: Добавить в базу данных новую книгу
 *      tags:
 *        - Books
 *      requestBody:
 *        $ref: "#/components/requestBodies/Books"
 *      responses:
 *        200:
 *          description: Книга добавлена в базу данных
 * components:
 *   requestBodies:
 *     Books:
 *       description: Информация о книге для добавления в базу данных
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Война и мир
 *               author:
 *                 type: string
 *                 example: Л.Н. Толстой
 *               publicationYear:
 *                 type: integer
 *                 example: 1900
 *               pagesNumber:
 *                 type: integer
 *                 example: 500000
 */
router.post(
  "/",
  validationMiddleware.validateBody,
  BooksControllers.createBook
);

/**
 * @swagger
 * /api/books/{id}:
 *   patch:
 *     summary: Обновление title книги
 *     description: Обновляет title книги по его id
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Идентификатор книги
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Война и мир
 *     responses:
 *       200:
 *         description: Название книги успешно обновлено.
 */
router.patch(
  "/:id",
  validationMiddleware.validateTitle,
  validationMiddleware.validateParamId,
  BooksControllers.updateBookTitle
);

/**
 * @swagger
 * /api/books/{id}:
 *    delete:
 *      summary: Удалить книгу
 *      description: Удалить книгу из базы данных
 *      tags:
 *        - Books
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Идентификатор книги
 *      responses:
 *        200:
 *          description: Успешное удаление книги
 */
router.delete(
  "/:id",
  validationMiddleware.validateParamId,
  BooksControllers.deleteBook
);

module.exports = router;
