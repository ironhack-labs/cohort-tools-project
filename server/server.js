const app = require("./app");

const PORT = process.env.PORT || 5005;

// START SERVER

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
