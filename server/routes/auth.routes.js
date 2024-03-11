const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { isTokenValid } = require("../middlewares/auth.middlewares");

//POST "/api/auth/signup" => recibir info del usuario y crear perfil en la DB
router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;
  console.log(email, password, name);

  //deberíamos validar datos del usuario
  if (!email || !password || !name) {
    res
      .status(400)
      .json({ message: "email, password y name son obligatorios" });
    return;
  }
  //validar que la contraseña sea suficientemente fuerte
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  if (passwordRegex.test(password) === false) {
    res.status(400).json({
      message:
        "password debe contener mínimo 8 caracteres, 1 mayúscula y 1 minúscula",
    });
    return;
  }

  try {
    //validar que el usuario no existe en la DB
    const foundUser = await User.findOne({ email: email });
    if (foundUser !== null) {
      res.status(400).json({ message: "correo de usuario ya registrado" });
      return;
    }

    //cifrar contraseña
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);

    //crear el usuario en la DB
    await User.create({
      email,
      password: hashPassword,
      name,
    });
    res.status(201).json({ message: "usuario creado en la DB" });
  } catch (error) {
    next(error);
  }
});

//POST "api/auth/login" => validar las credenciales del usuario y enviar un token
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    res.status(400).json({ message: "email y password son obligatorios" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser === null) {
      //el usuario no existe
      res.status(400).json({ message: "email no registrado" });
      return;
    }

    //comprobar si el password es correcto
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (isPasswordCorrect === false) {
      res.status(400).json({ message: "password no válido" });
      return;
    }

    //crear token y enviar al cliente
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
    };
    //console.log(payload);
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "5d",
    });
    res.status(200).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

// GET "api/auth/verify" => validar el token e indicar al cliente que el usuario está autenticado
router.get("/verify", isTokenValid, (req, res, next) => {
  res.json(req.payload);
});

module.exports = router;
