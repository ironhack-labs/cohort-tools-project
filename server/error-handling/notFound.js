const notFound = (req, res, next) => {
  res.status(404).json({ error: "Route not found", status: 404 });
};

module.exports = notFound;