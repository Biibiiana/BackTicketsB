// ℹ️ paquete responsable de realizar la conexión con mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Establece el URI de MongoDB para que nuestra app tenga acceso a él.
// Si no se ha establecido ningún env, lo establecemos dinámicamente 
// al nombre de la carpeta que haya al crear la app.

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ticketB";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
