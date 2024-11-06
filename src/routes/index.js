const express = require("express");

const usersRoutes = require("./usersRoutes");
const booksRoutes = require("./booksRoutes");

const router = express.Router();

router.use("/books", booksRoutes);
router.use("/users", usersRoutes);

module.exports = router;
