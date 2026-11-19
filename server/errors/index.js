function handleErrors(app) {
  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({
      message: "INERNAL SERVER ERROR",
      error: error,
    });
  });
}

module.exports = handleErrors;
