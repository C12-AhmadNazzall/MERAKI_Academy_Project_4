const express = require("express");
const { CreatRole } = require("../controllers/role");
const { default: mongoose } = require("mongoose");
const roleRouter = express.Router();
roleRouter.post("/", CreatRole);
module.exports = roleRouter;
