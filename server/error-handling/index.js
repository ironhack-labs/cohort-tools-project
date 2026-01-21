module.exports = (app) => {
  // middleware to handle when requested page is not available
  app.use((req, res, next) => {
    const error = new Error("This route does not exist");
    error.statusCode = 404;
    next(error);
  });

  app.use((err, req, res, next) => {
    // middleware to handle errors when next(err) is called
    console.error("ERROR", req.method, req.path, err);

    const status = err.statusCode || 500;
    const message =
      err.message || "Internal Server Error. Please check the server console.";
    //only render if error occurs before sending response
    if (!res.headersSent) {
      res.status(status).json({ message });
    }
  });
};
