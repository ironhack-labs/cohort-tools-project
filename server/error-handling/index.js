function errorHandling(app){

  app.use((req,res)=>{
    // res.status(404).send(req.headers)
    res.status(404).json({errorMessage:"Te has perdido, ruta desconocida"})
  })

  app.use((error,req,res,next)=>{
    console.log(error)
    res.status(500).json({errorMessage: "GAtito de servidor"})
  })
}

module.exports = errorHandling