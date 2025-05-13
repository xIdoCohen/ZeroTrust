// app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./src/db");
const logRequest = require("./src/middlewares/requestLogger");
const helmet = require("helmet");
const cookieParser = require('cookie-parser');


dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
//xss protection
app.use(helmet());

app.use(logRequest); 

app.use(function(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: "Invalid JSON syntax in request body." });
  }
  next();
})



//Models
const User = require("./src/models/user");

// Routes
const authRoutes = require("./src/routes/authRoutes");
const streamRoutes = require("./src/routes/streamRoutes");
const adminRoutes = require("./src/routes/adminRoutes");


const testRoutes = require("./src/routes/testRoutes");

//app.use("/", testRoutes);
app.use("/auth", authRoutes);
app.use("/", streamRoutes); // stream
app.use("/admin", adminRoutes); // admin

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


sequelize.sync({alter:true} ).then(() => {
  console.log("MySQL synced");
});

module.exports = app;
