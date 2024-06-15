// in routes/upload.routes.js

const router = require("express").Router();
const uploader = require('../middlewares/uploader');

router.post("/", uploader.single("image"), (req, res, next) => {
  // Aquí manejas el archivo subido y cualquier otra lógica necesaria
  if (req.file) {
    res.status(200).json({
      message: 'Archivo subido exitosamente',
      file: req.file
    });
  } else {
    res.status(400).json({
      message: 'Error al subir el archivo'
    });
  }

  // obtener la URL del archivo subido y enviarlo como respuesta.
  // 'imageUrl' puede ser cualquier nombre, sólo asegúrate de recordar 
  // usar el mismo cuando accedas a él en el frontend (response.data.imageUrl).

  res.json({ imageUrl: req.file.path });
});

module.exports = router;
