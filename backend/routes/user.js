const express = require("express");
const { register, Login } = require("../controllers/users");
const usersRouter = express.Router();
usersRouter.post("/register", register);
usersRouter.post("/login", Login);
module.exports = usersRouter;
