function errorHandler(err, req, res, next) {
    console.error("Error", req.method, req.path, err);
  
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal servor error..." });
    }
  }
  
  function notFoundHandler(req, res, next) {
    res.status(404).json({ message: "This route does not exist" });
  }
  
  module.exports = { errorHandler, notFoundHandler };