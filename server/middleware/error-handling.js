function errorHandler(err, req, res, next) {
  console.log("Error:", req.method, req.path, err);

  if (!res.headersSent) {
    res
      .status(500)
      .json({ message: "Internal server error. Check the server console." });
  }
}

function notFoundHandler(req, res, next) {
  res.status(404).json({ message: "This route does not exist." });
}

// function badRequestHandler(req, res, next) {
//   res.status(400).json({ message: "Very bad request!!!" });
// }

module.exports = { errorHandler, notFoundHandler};
