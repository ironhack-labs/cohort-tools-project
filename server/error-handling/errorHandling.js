function error500(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({ errorMessage: err.message || err });
}

function error403Credentials(res) {
  res.status(403).json({ errorMessage: "Invalid Credentials" });
}

module.exports = { error500, error403Credentials };
