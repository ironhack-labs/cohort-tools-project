function errorHandler(err, req, res, next) {
  console.error({
    message: "Oops error",
    name: err.name,
    message: err.message,
    method: req.method,
    route: err.route,
  });
  if (!res.headersSent) {
    res.status(500).json({
      message: "Internal server error. Check the server console",
    });
  }
  next(err);
}

function notFoundHandler(req, res, next) {
  res.status(404).json({ message: "This route does not exist" });
}

module.exports = { errorHandler, notFoundHandler };
