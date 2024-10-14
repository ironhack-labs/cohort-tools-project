const mongoose = require("mongoose")

//MONGOOSE
//mongodb://127.0.0.1 esto es la ip por defecto
mongoose.connect("mongodb://127.0.0.1:27017/cohort-tools-api")
// .then(x=>console.log(`Connected to Database: "${x.connections[0].name}`))

.then(() =>{
  console.log(`Connected to Database`)
})

// .catch(err => console.error("Error connecting to MongoDB", err))
.catch((error) => {
  console.log("Error connecting to MongoDB", error)
})
