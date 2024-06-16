require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Configuración de CORS
app.use(cors());

// Middleware para parsear cuerpos de solicitud en JSON
app.use(express.json());

// ℹ️ Se conecta a la base de datos
require("./db");
// ℹ️ Esta función se exporta desde la carpeta config. 
// Ejecuta la mayoría de las piezas de middleware
require("./config")(app);

// 👇 Manejo de rutas
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// ❗ Para gestionar errores. Rutas que no existen o errores que
// manejas en rutas específicas.
require("./error-handling")(app);

module.exports = app;
