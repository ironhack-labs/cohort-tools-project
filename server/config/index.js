const config = {
  PORT: process.env.PORT || 5005,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/cohort-tools-dev",
};

module.exports = config;
