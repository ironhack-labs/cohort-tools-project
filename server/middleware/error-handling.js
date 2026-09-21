function errorHandler(err, req, res, next) {
  console.error("ERROR", req.method, req.path, err); // More explicit logging

  // If headers have already been sent, delegate to the default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  // Determine response based on error type or status code
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const statusCode = err.response.status;
    const message = err.response.data.message || "Unexpected error occurred";

    res.status(statusCode).json({ message });
  } else if (err.request) {
    // The request was made but no response was received
    res
      .status(503)
      .json({ message: "Service unavailable. Unable to reach server." });
  } else if (err.code === "ERR_NETWORK") {
    res
      .status(503)
      .json({ message: "Network error. Check connection and URLs." });
  } else if (err.name === "ValidationError") {
    // Handle specific error if you are using validation libraries like Joi
    res.status(400).json({ message: err.message });
  } else if (err.name === "UnauthorizedError") {
    // Specific error handling for unauthorized access
    res
      .status(401)
      .json({ message: "Unauthorized. Please check your credentials." });
  } else {
    // Generic error fallback
    res.status(500).json({
      message:
        "Internal server error. Check the server console. Fatma wrote this.",
    });
  }
}

function notFoundHandler(req, res, next) {
  res
    .status(404)
    .json({ message: "This route does not exist. Fatma wrote this." });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
