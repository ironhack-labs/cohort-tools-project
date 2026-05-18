function errorHandling(app) {



//error handling for 404 errors
app.use((req, res) => {
  res.status(404).json({ errorMessage: "Sorry, route not found" });
});

// error handling for 500 errors
app.use((error, req, res, next) => {
  // express know this is the 500 error handler just because it has 4 parameters.
  console.log(error);
  res
    .status(500)
    .json({ errorMessage: "something went BOOM, sorry about this" });
});

}


module.exports = errorHandling