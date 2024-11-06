const BooksServices = require("../services/booksServices");

const { validationResult } = require("express-validator");
const Sentry = require("@sentry/node");

class BooksControllers {
  async getBooks(req, res) {

    console.log('here')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let books = [];
      if (!req.query.title && !req.query.author) {
        console.log('here')
        // получить все книги
        books = await BooksServices.getBooks(req.query.page);
      } else if (req.query.title && req.query.author) {
        // получить книги по наименованию и автору
        books = await BooksServices.findBookByAutorAndTitle(
          req.query.title,
          req.query.author,
          req.query.page
        );
        if (!books) {
          res.send("Книга с указанным автором и названием не найдена.");
        }
      } else if (req.query.title) {
        // получить книги по наименованию
        books = await BooksServices.findBookByTitle(
          req.query.title,
          req.query.page
        );
        if (!books) {
          res.send("Книги с указанным названием не найдены.");
        }
      } else if (req.query.author) {
        // получить книги по автору
        books = await BooksServices.findBookByAuthor(
          req.query.author,
          req.query.page
        );
        if (!books) {
          res.send("Книги с указанным автором не найдены.");
        }
      }
      res.send(JSON.stringify(books));
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async getBooksCount(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const count = await BooksServices.getBooksCount();
      res.send("Количество книг в библиотеке: " + count);
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async getBookById(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const book = await BooksServices.findBookById(req.params.id);
      if (book) {
        res.send(JSON.stringify(book));
      } else {
        res.send("Книга с указанным id не найдена.");
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async createBook(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await BooksServices.createBook({
        ...req.body,
      });
      res.send("Новая книга добавлена в библиотеку.");
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async updateBookTitle(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const book = await BooksServices.findBookById(req.params.id);
      if (!book) {
        res.send("Книга с указанным id не найдена.");
      } else {
        await BooksServices.updateBook(req.params.id, req.body.title);
        res.send("Информация о книге обновлена.");
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async deleteBook(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const book = await BooksServices.findBookById(req.params.id);
      if (!book) {
        res.send("Книга с указанным id не найдена.");
      } else {
        await BooksServices.deleteBook(req.params.id);
        res.send("Книга удалена.");
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }
}

module.exports = new BooksControllers();
