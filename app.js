// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Se conecta a la base de datos
require("./db");

// Gestiona las peticiones http (express es un node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ Esta función se exporta desde la carpeta config. 
// Ejecuta la mayoría de las piezas de middleware
require("./config")(app);

// 👇 Empieza a manejar rutas aquí
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

// ❗ Para gestionar errores. Rutas que no existen o errores que
// manejas en rutas específicas.
require("./error-handling")(app);

module.exports = app;
