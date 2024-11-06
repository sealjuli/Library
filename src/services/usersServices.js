const { Users, UserBooks } = require("../models/models");

class UsersServices {
  async saveUser(user) {
    const newUser = await Users.create(user);
    return newUser;
  }

  async getUsersCount() {
    const count = await Users.count();
    return count;
  }

  async findUserById(id) {
    const user = await Users.findOne({ where: { id } });
    return user;
  }

  async findUserByEmail(email) {
    const user = await Users.findOne({ where: { email } });
    return user;
  }

  async getUsers(page) {
    let limit;
    let offset;
    if (page) {
      limit = 10;
      offset = (page - 1) * limit;
    }
    const data = await Users.findAll({ limit, offset });
    return data;
  }

  async updateUsers(id, name) {
    const user = await Users.update({ name }, { where: { id } });
    return user;
  }

  async deleteUser(id) {
    await Users.destroy({ where: { id } });
  }

  async saveUserBook(userId, bookId) {
    const data = await UserBooks.create({
      UserId: userId,
      BookId: bookId,
    });

    return data;
  }
}

module.exports = new UsersServices();
