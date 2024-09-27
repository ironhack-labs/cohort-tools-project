var express = require('express');
var app = express();
app.use(express.json());
// Return a random number between 0 and 100
const getRandom = () => {
return Math.floor(Math.random() * 101);
};
app.get('/random', function (req, res) {
const number = getRandom();
res.send({ number });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`App is running on port ${port}`);
});
module.exports = { app, getRandom };