const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // just to check if it fucks up or not :)

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

module.exports = errorHandler;
