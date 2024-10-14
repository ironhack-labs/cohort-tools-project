
function errorHandling(app) {
  app.use((req, res) => {
    res.status(404).json({ errorMessage: "Esta ruta no existe" });
  });

  app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ errorMessage: "Server problem" });
  });
}

module.exports = errorHandling;
