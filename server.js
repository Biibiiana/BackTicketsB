const app = require("./app");

// ℹ️ Establece el PORT para que nuestra aplicación tenga acceso a él. 
// Si no se ha establecido env, lo codificamos a 5005
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
