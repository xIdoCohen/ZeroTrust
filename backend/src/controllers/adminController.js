// src/controllers/admin.controller.js
const User = require("../models/user"); 
const {adminLogger,securityLogger} = require("../loggers/LoggerManager");
const bcrypt = require("bcrypt");


async function createAdmin(req, res) {
  const { username, password, email } = req.body;
  if (!username || !password) {
    securityLogger.warn(`Create admin failed: missing username or password in request from ${req.ip}`);
    return res.status(400).json({ message: "Username and password are required." });
  }

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = await User.create({
    username,
    password: hashedPassword,
    email,
    role: "admin",
    allowedDevice: "any"
  });

  res.status(201).json({
    message: "Admin created",
    user: { username: newAdmin.username, role: newAdmin.role }
  });
}

async function getUsers(req, res) {
  console.log("IAM HERE");
  console.log(req.user);
  if (req.user.role !== "admin") {
    securityLogger.warn(`Access denied: user '${req.user?.username}' (role: '${req.user?.role}') attempted to access /admin/users from ${req.ip}`);
    return res.status(403).json({ message: "NOT AUTHORIZED " });
  }

  const users = await User.findAll({
    attributes: ["id", "username", "email", "role", "createdAt"],
  });

  res.json(users);
  adminLogger.info(`[ADMIN] User ${req.user.username} fetched all users`);
}


async function deleteUser(req, res) {
  if (req.user.role !== "admin") {
    securityLogger.warn(`Access denied: user '${req.user?.username}' (role: '${req.user?.role}') attempted to delete a user from ${req.ip}`);
    return res.status(403).json({ message: "NOT AUTHORIZED" });
  }

  const id = req.params.id;
  const deleted = await User.destroy({ where: { id } });

  if (deleted) {
    adminLogger.info(`[ADMIN] User ${req.user.username} deleted user ID ${id}`);
    res.json({ message: `User ${id} deleted.` });
  } else {
    res.status(404).json({ message: "User not found." });
  }
}


async function createUser(req, res) {
    const requestingUser = req.user;
    if (requestingUser.role !== "admin") {
      securityLogger.warn(`Access denied: user '${requestingUser?.username}' (role: '${requestingUser?.role}') attempted to create a user from ${req.ip}`);
      return res.status(403).json({ message: "NOT AUTHORIZED" });
    }
    const { username, password,email, role = "viewer", allowedDevice = "any" } = req.body;
    if (!username || !password) {
      securityLogger.warn( `Create user failed: missing username or password in request from ${req.ip}`);
      return res.status(400).json({ message: "Username and password are required." });
    }
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists." });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      role:"viewer",
      allowedDevice
    });
    
    adminLogger.info(`[ADMIN] User ${requestingUser.username} created user ${username} with role ${role}`);
    res.status(201).json({
      message: "User created",
      user: { username: newUser.username, role: newUser.role }
    });
}
module.exports = { getUsers, deleteUser,createUser,createAdmin};
