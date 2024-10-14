const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const verifyToken = require("../middlewares/auth.middlewares")

const User = require("../models/Users.model");

//POST- "/api/auth/signup" => Crea un nuevo usuario
router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(400).json({ message: "Todos los campos son requeridos" });
    return;
  }

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/gm;
  if (!regexPassword.test(password)) {
    res.status(400).json({
      message:
        "La contraseña debe tener al menos, una mayuscula, una minuscula, un numero y entre 8 y 16 caracteres",
    });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res.status(400).json({ message: "Usuario ya registrado con ese email" });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({
      email,
      password: hashPassword,
      name,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});


//POST- "/api/auth/login" => Comprueba si email y password son correctos

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Todos los campos son requeridos" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      res
        .status(400)
        .json({ message: "No se encuentra ningun usuario con ese email" });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Contraseña incorrecta" });
      return;
    }

    const playload = {
      _id: foundUser._id,
      email: foundUser.email,
    };

    const authToken = jwt.sign(playload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });
    res.status(200).json({ authToken: authToken });
  } catch (error) {
    console.error("Error???", error)
    next(error);
  }
});

//GET- "/api/auth/verify" => Verifica JWT
router.get("/verify", verifyToken, (req, res)=>{
  res.status(200).json(req.payload)
})


module.exports = router;
