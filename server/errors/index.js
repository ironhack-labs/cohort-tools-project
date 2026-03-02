function errorHandling(app) {
  app.use((req, res) => {
    res.status(404).json({ errorMessage: "Route not found!" });
  });

  app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).json({ errorMessage: "server broke" });
  });
}

module.exports = errorHandling