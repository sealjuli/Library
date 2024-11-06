const UsersServices = require("../services/usersServices");

const { validationResult } = require("express-validator");
const Sentry = require("@sentry/node");
const { now } = require("mongoose");

class UsersControllers {
  async getUsers(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const users = await UsersServices.getUsers(req.query.page);
      res.send(JSON.stringify(users));
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async getUserById(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await UsersServices.findUserById(req.params.id);
      if (user) {
        res.send(JSON.stringify(user));
      } else {
        res.send("Пользователь с указзанным id не найден.");
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async getUsersCount(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const count = await UsersServices.getUsersCount();
      res.send("Количество пользователей библиотеки: " + count);
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await UsersServices.findUserByEmail(req.body.email);

      if (!user) {
        const result = await UsersServices.saveUser({
          ...req.body,
          registerDate: now(),
        });
        res.send("Новый пользователь добавлен.");
      } else {
        res.send(
          "Пользователь с указанной почтой уже существует в базе данных."
        );
      }
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }

  async updateUserName(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await UsersServices.findUserById(req.params.id);
      if (!user) {
        res.send("Пользователь с указанным id не найден.");
      } else {
        await UsersServices.updateUsers(req.params.id, req.body.name);
        res.send("Информация о пользователе обновлена.");
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async deleteUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const book = await UsersServices.findUserById(req.params.id);
      if (!book) {
        res.send("Пользоатель с указанным id не найден.");
      } else {
        await UsersServices.deleteUser(req.params.id);
        res.send("Пользователь удален.");
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async userGetBook(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const book = await UsersServices.saveUserBook(
        req.body.userId,
        req.body.bookId
      );
      res.send(
        `Пользователь ${req.body.userId} взял книгу ${req.body.bookId}.`
      );
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
      res.send(error);
    }
  }
}

module.exports = new UsersControllers();
