// middlewares/uploader.js
const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta de destino para los archivos subidos
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombre del archivo subido
  }
});

// Filtros para limitar el tipo de archivos que se pueden subir
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Solo imágenes con formato jpeg, jpg, png son permitidas.'));
};

const uploader = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = uploader;
