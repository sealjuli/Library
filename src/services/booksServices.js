const Books = require("../models/books.model");

class BooksServices {
  async createBook(book) {
    const newBook = await Books.create(book);
    return newBook;
  }

  async findBookById(id) {
    const book = await Books.findOne({ where: { id } });
    return book;
  }

  async findBookByTitle(title, page) {
    let limit;
    let offset;
    if (page) {
      limit = 10;
      offset = (page - 1) * limit;
    }
    const book = await Books.findAndCountAll({
      where: { title },
      limit,
      offset,
    });
    return book;
  }

  async findBookByAutorAndTitle(title, author, page) {
    let limit;
    let offset;
    if (page) {
      limit = 10;
      offset = (page - 1) * limit;
    }
    const book = await Books.findAndCountAll({
      where: { title, author },
      limit,
      offset,
    });
    return book;
  }

  async findBookByAuthor(author, page) {
    let limit;
    let offset;
    if (page) {
      limit = 10;
      offset = (page - 1) * limit;
    }
    const book = await Books.findAndCountAll({
      where: { author },
      limit,
      offset,
    });
    return book;
  }

  async getBooksCount() {
    const count = await Books.count();
    return count;
  }

  async getBooks(page) {
    let limit;
    let offset;
    if (page) {
      limit = 10;
      offset = (page - 1) * limit;
    }
    const data = await Books.findAll({ limit, offset });
    return data;
  }

  async updateBook(id, title) {
    const book = await Books.update({ title }, { where: { id } });
    return book;
  }

  async deleteBook(id) {
    await Books.destroy({ where: { id } });
  }
}

module.exports = new BooksServices();
