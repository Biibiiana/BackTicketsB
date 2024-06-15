const router = require("express").Router();
const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isTokenValid = require("../../middlewares/auth.middlewares");

// POST "/api/auth/singup" => recibir data del usuario y lo crea en la DB
router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  // validaciones:
  if (!username || !email || !password) {
    res
      .status(401)
      .json({ errorMessage: "Todos los campos deben estar llenos" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res
        .status(400)
        .json({ errorMessage: "Este email ya está en nuestra BDD" });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({
      username,
      email,
      password: hashPassword,
    });
    res.status(201).json({ message: "Usuario creado" });
  } catch (error) {
    next(error);
  }
});

// POST "/api/auth/login" => recibir credenciales del usuario y validarlo
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ errorMessage: "Todos los campos deben estar llenos" });
    return;
  }
  try {
    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      res.status(400).json({ errorMessage: "Usuario no registrado" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      res.status(400).json({ errorMessage: "Contraseña no válida" });
      return;
    }
    const payload = {
      username: foundUser.username,
      _id: foundUser._id,
      email: foundUser.email,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    res.json({ authToken });
  } catch (error) {
    next(error);
  }
});

// GET "/api/auth/verify" => Indicar al FE si está que visita la pagina está activo y quién es
router.get("/verify", isTokenValid, (req, res, next) => {
  res.json({ payload: req.payload });
});

module.exports = router;
