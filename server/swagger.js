const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    title: "Cohort Tools API",
    version: "1.0.0",
    description: "API for managing cohorts and students",
  },
  host: "localhost:5005",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    { name: "Cohorts", description: "Cohort management endpoints" },
    { name: "Students", description: "Student management endpoints" },
  ],
  "@definitions": {},
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

// Generate swagger.json then add tags based on paths
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // Read the generated file and add tags
  const fs = require("fs");
  const swaggerDoc = require(outputFile);

  // Add tags to paths based on route
  for (const path in swaggerDoc.paths) {
    for (const method in swaggerDoc.paths[path]) {
      if (path.includes("/api/cohorts")) {
        swaggerDoc.paths[path][method].tags = ["Cohorts"];
      } else if (path.includes("/api/students")) {
        swaggerDoc.paths[path][method].tags = ["Students"];
      }
    }
  }

  // Write back the modified swagger doc
  fs.writeFileSync(outputFile, JSON.stringify(swaggerDoc, null, 2));
  console.log("Swagger documentation generated with tags!");
});
