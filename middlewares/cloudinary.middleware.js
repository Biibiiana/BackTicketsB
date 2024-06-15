// middlewares/cloudinary.middleware.js

const cloudinary = require('cloudinary').v2;

// Configura Cloudinary con tus credenciales
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = (req, res, next) => {
  const file = req.files.image; // Suponiendo que estás usando algún middleware para manejar la subida de archivos, como 'express-fileupload'

  cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    req.fileUrl = result.secure_url;
    next();
  });
};

module.exports = { uploadImage };
