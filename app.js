require("dotenv").config();
// ℹ️ Se conecta a la base de datos
require("./db");
// ℹ️ Esta función se exporta desde la carpeta config. 
// Ejecuta la mayoría de las piezas de middleware
require("./config")(app);

const express = require("express");
const app = express();


// 👇 Manejo de rutas
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

// ❗ Para gestionar errores. Rutas que no existen o errores que
// manejas en rutas específicas.
require("./error-handling")(app);

module.exports = app;
