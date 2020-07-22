const express = require("express");

const app = express();

// Middlewares
app.use(express.json());

// Mount Routers

module.exports = app;
