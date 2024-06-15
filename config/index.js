// Reutilizamos esta importación para tener acceso a la propiedad `body` en las peticiones
const express = require("express");

// ℹ️ Responsable de los mensajes que se ven en el terminal a medida que van llegando peticiones
// https://www.npmjs.com/package/morgan
const logger = require("morgan");

// ℹ️ Necesario cuando tratamos con cookies (lo haremos cuando tratemos con autenticación)
// https://www.npmjs.com/package/cookie-parser
const cookieParser = require("cookie-parser");

// ℹ️ Necesario para aceptar peticiones del "exterior". CORS significa cross origin 
// resource sharing a menos que la petición sea del mismo dominio, 
// por defecto express no acepta peticiones POST.
const cors = require("cors");

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";

// Configuración del middleware
module.exports = (app) => {
  // Como este es un servidor que aceptará peticiones del exterior y estará alojado
  // en un servidor con un `proxy`, express necesita saber que debe confiar en esa configuración.
  // Servicios como heroku usan algo llamado proxy y necesitas añadirlo a tu servidor.
  app.set("trust proxy", 1);

  // controla una cabecera muy específica para pasar cabeceras desde el frontend
  app.use(
    cors({
      origin: [FRONTEND_URL]
    })
  );

 // En el entorno de desarrollo, la aplicación registra
  app.use(logger("dev"));

  // Para tener acceso a la propiedad `body` en la petición
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
