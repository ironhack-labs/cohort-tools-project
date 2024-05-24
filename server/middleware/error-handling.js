// middleware/error-handling.js
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
}

function notFoundHandler(req, res, next) {
  res.status(404).json({ error: "Not Found" });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
