function errorHandler(err, req, res) {
  console.error("ERROR", req.method, req.path, err);
  res
    .status(500)
    .json({ message: "Internal server error. Check the server console" });
}

function notFoundHandler(req, res) {
  if (!res.headersSent) {
    res
      .status(500)
      .json({ message: "Internal server error. Check the server console" });
  }
  res.status(404).json({ message: "This ID does not exist" });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
