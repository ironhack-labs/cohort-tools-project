const router = require("express").Router();
const User = require("../models/User.model");

const { isAuthenticated } = require("../middleware/jwt.middleware");
const { error403Credentials } = require("../error-handling/errorHandling");

// Pas cablé

const mongoose = require("mongoose");
// ...existing code...

router.get("/users/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  // Vérifie si l'id est un ObjectId valide
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ messageError: "Invalid user id format" });
  }
  try {
    const foundUserById = await User.findById(id);
    if (!foundUserById) {
      return res.status(404).json({ messageError: "User not found" });
    }
    res.status(200).json(foundUserById);
  } catch (error) {
    res.status(500).json({ messageError: error });
  } 
});
module.exports = router;
