const express = require("express");
const router = express.Router();

const UsersControllers = require("../controllers/usersControllers");
const validationMiddleware = require("../middleware/validationUser");

/**
 * @swagger
 * /api/users/count:
 *   get:
 *     summary: Получить количество пользователей
 *     description: Получение количества пользователей в системе
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Количество пользователей
 */
router.get("/count", UsersControllers.getUsersCount);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Получить список пользователей с пагинацией
 *     description: Получение списка пользователей из базы данных
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: string
 *         description: Страница
 *     responses:
 *       200:
 *         description: Массив пользователей
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 94c7e23a-0474-4d7c-979c-d647e70df3b5
 *         name:
 *           type: string
 *           example: Юлия
 *         email:
 *           type: string
 *           example: shemplehova@gmail.com
 *           unique: true
 *         registerDate:
 *           type: date
 *           example: 01.01.2024 10:15:56
 */
router.get("/", validationMiddleware.validateQueryPage, UsersControllers.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Получить конкретного пользователя
 *     description: Получение конкретного пользователя по id из базы данных
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Идентификатор пользователя
 *     responses:
 *       200:
 *         description: Информация о пользователе
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 94c7e23a-0474-4d7c-979c-d647e70df3b5
 *         name:
 *           type: string
 *           example: Юлия
 *         email:
 *           type: string
 *           example: shemplehova@gmail.com
 *           unique: true
 *         registerDate:
 *           type: date
 *           example: 01.01.2024 10:15:56
 */
router.get(
  "/:id",
  validationMiddleware.validateParamId,
  UsersControllers.getUserById
);

/**
 * @swagger
 * /api/users:
 *    post:
 *      summary: Создание пользователя
 *      description: Создать нового пользователя
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/Users"
 *      responses:
 *        200:
 *          description: Пользователь успешно создан
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 94c7e23a-0474-4d7c-979c-d647e70df3b5
 *         name:
 *           type: string
 *           example: Юлия
 *         email:
 *           type: string
 *           example: shemplehova@gmail.com
 *           unique: true
 *         registerDate:
 *           type: date
 *           example: 01.01.2024 10:15:56
 *   requestBodies:
 *     Users:
 *       description: Свойства пользователя для добавления в базу данных
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Юлия
 *               email:
 *                 type: string
 *                 example: shemplehova@gmail.com
 *                 unique: true
 */
router.post(
  "/",
  validationMiddleware.validateBodyUser,
  UsersControllers.createUser
);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Обновление имени пользовтеля
 *     description: Обновляет name пользователя по его id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Идентификатор пользователя
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Юлия
 *     responses:
 *       200:
 *         description: Информация о пользователе успешно обновлена.
 */
router.patch(
  "/:id",
  validationMiddleware.validateBodyName,
  validationMiddleware.validateParamId,
  UsersControllers.updateUserName
);

/**
 * @swagger
 * /api/users/{id}:
 *    delete:
 *      summary: Удалить пользователя
 *      description: Удалить пользователя из базы данных
 *      tags:
 *        - Users
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Идентификатор пользователя
 *      responses:
 *        200:
 *          description: Успешное удаление пользователя
 */
router.delete(
  "/:id",
  validationMiddleware.validateParamId,
  UsersControllers.deleteUser
);

/**
 * @swagger
 * /api/users/getBook:
 *    post:
 *      summary: Пользователь берет книгу
 *      description: Пользователь берет книгу
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/UserBook"
 *      responses:
 *        200:
 *          description: Пользователь взял книгу
 * components:
 *   requestBodies:
 *     UserBook:
 *       description: Данные для сохранения в базу (пользователь берет книгу)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 94c7e23a-0474-4d7c-979c-d647e70df3b5
 *                 description: Идентификатор пользователя
 *               bookId:
 *                 type: string
 *                 example: 94c7e23a-0474-4d7c-979c-d647e70df3b5
 *                 description: Идентификатор книги
 */
router.post(
  "/getBook",
  // validationMiddleware.validateBodyUser,
  UsersControllers.userGetBook
);

module.exports = router;
