

function errorHandler (err, req, res, next){
  console.error('error', req.method, req.path, err);

  if(!headersSent){
    res.status(500).json({message: 'Internal Server Error'})
  }
}

function notFoundHandler (req,res,next){
  res.status(404).json({message: 'This route does not exist!'})
}

module.exports = {errorHandler, notFoundHandler}