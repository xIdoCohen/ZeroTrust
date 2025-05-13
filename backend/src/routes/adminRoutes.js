const express = require("express");
const { authenticateJWT } = require("../middlewares/auth");
const { getUsers, deleteUser, createUser,createAdmin } = require("../controllers/adminController");
const validate= require("../middlewares/validate");

const router = express.Router();
router.post("createAdmin", createAdmin);
// Protect everything under /admin/*

router.use(authenticateJWT);
// Routes
router.get("/users", getUsers);

router.post("/users" , validate, createUser);     
router.delete("/users/:id", deleteUser);

module.exports = router;
