import express from "express"
import isAuth from "../middlewares/isAuth.middleware.js"
import {
  getUser,
   createUser,
   login,
   userVerified
} from "../controllers/auth.controllers.js"
/* import bcrypt from "bycryptjs"
import jwt from "jsonwebtoken" */


const router = express.Router();

router.get("/api/users/:id", isAuth, getUser);
router.post("/auth/signup", createUser);
router.post("/auth/login", login);
router.get("/auth/verify", isAuth, userVerified);

export default router;