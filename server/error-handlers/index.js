function errorHandling(app){

  app.use((req, res) =>{
    res.status(404).json({errorMessage: "You are a little bit lost"})
  })

  // 500 
  app.use((error, req, res, next) => {

    res.status(500).json({errorMessage: "Server issues"})
  })
}

module.exports = errorHandling