const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

// retrieve specific user by ID
router.get("/:userId", (req, res, next) => {
	const { userId } = req.params;
	if (!userId) {
		res.status(400).json({ message: "invalid ID" });
		return;
	}
	User.findById(userId)
		.then((user) => {
			const { _id, email, name } = user;
			res.status(200).json({ _id, email, name });
		})
		.catch((error) => {
			console.log("retrieving ID did not go well", error);
			res.status(500).json({ message: "error in the process" });
		});
});

module.exports = router;

/** 
 * returns
 {
  "data": {
    "_id": "6606dc5632b0d11f9be51b4e",
    "email": "shrek@swamp.com",
    "password": "$2a$10$NRRK9KnZaKrHW0np6h.fMujukvMnB2Qt/Lb0h2lXdp1Jv5s5r3e7O",
    "name": "shrek",
    "__v": 0
  }
}
 */
