class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  console.error("there was an error", req.method, req.path, err);
  if (!res.headersSent) {
    switch (err.message) {
      case "student not found": {
        res.status(404).json({ message: "student not found" });
        break;
      }
      case "student not deleted": {
        res.status(204).end({ message: "student not deleted" });
        break;
      }
      default:
        res.status(500).json({ message: "Internal server error.", err });
    }
  }
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: "path not found" });
};

module.exports = { errorHandler, notFoundHandler, AppError };
