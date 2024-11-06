const sequelize = require("../config/db");

const Users = require("./users.model");
const Books = require("./books.model");
const UserBooks = require("./userBooks.model");

Users.belongsToMany(Books, { through: UserBooks });
Books.belongsToMany(Users, { through: UserBooks });

/*
(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Tables synced");
  } catch (error) {
    console.error("Error syncing tables:", error);
  }
})();
*/

module.exports = { Users, Books, UserBooks };
