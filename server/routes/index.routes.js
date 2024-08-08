const router = require("express").Router();

// TO TEST errorHandler
// const getDataFromDatabase = () => {
//     // We are intentionally rejecting the promise to simulate a failed database operation.
//     return Promise.reject("Failed to retrieve the data from database.");
//   }

//GET /api
router.get("/api", (req, res, next) => {
  res.send("General route !");
  // TO TEST errorHandler
  //   getDataFromDatabase()
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(error => {
  //     // Catching the rejected promise and passing the error to next()
  //     next(error);
  //   });
});

module.exports = router;