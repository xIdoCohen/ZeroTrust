// src/routes/stream.routes.js
const express = require("express");
const { authenticateJWT } = require("../middlewares/auth");
const { getStreamAccess, serveStream } = require("../controllers/streamController");

const router = express.Router();

//router.get("/stream-access", authenticateJWT, getStreamAccess);
//router.get("/stream", authenticateJWT, serveStream);

module.exports = router;
