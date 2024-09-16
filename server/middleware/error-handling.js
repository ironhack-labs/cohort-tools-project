const errorHandler = (err, req, res, next) => {
    console.error("Error: ", req.method, req.path, err);
    if (err.name === "ValidationError") {
      let error = {};
      Object.keys(err.errors).forEach(key => {
        error[key] = err.errors[key].message;
      });
      res.status(400).json(error);
    } else if (err.name == "CastError") {
      res.status(400).json({ message: err.message })
    } else {
      res.status(500).json({ message: "Internal server error occured." });
    }
  }
  
  const notFoundHandler = (req, res, next) => {
    res.status(404).json({ message: "This route does not exist" });
  }
  
  module.exports = {
    errorHandler,
    notFoundHandler
  }