function errorHandler(err, req, res, next) {
  console.log('ERROE', req.method, req.path, err);

  if (!res.headersSent) {
    res.status(500).json({
      message: 'Internal Server Error. Check the server console',
    });
  }
}

function notFoundHandler(req, res, next) {
  res.status(404).json({
    message: 'This route does not exist',
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
