const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
};

const errorHandler = (error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || "Internal server error",
  });
};

module.exports = { notFoundHandler, errorHandler };