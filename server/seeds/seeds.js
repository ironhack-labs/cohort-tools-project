const mongoose = require("mongoose");
const Cohort = require("../models/Cohort");
const Student = require("../models/Student");
const cohortData = require("../cohorts.json");
const studentData = require("../students.json");

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cohort-tools-dev";

// Function to remove _id properties
const deleteId = (data) => {
  return data.map((item) => {
    // Create a copy of the item
    const newItem = { ...item };
    // Remove _id property to let MongoDB generate it
    if (newItem._id) {
      delete newItem._id;
    }
    return newItem;
  });
};

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to the database
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding");

    // Clear existing data
    await Cohort.deleteMany({});
    await Student.deleteMany({});
    console.log("Cleared existing data");

    // Process cohort data - remove _id fields
    const processedCohorts = deleteId(cohortData);

    // Insert cohorts first
    const cohorts = await Cohort.create(processedCohorts);
    console.log(`${cohorts.length} cohorts seeded successfully`);

    // Create a mapping from original cohort IDs to new MongoDB ObjectIds
    const cohortIdMap = {};
    cohorts.forEach((cohort, index) => {
      // Map the original ID from cohortData to the new MongoDB _id
      cohortIdMap[cohortData[index]._id] = cohort._id;
    });

    // Process student data - remove _id fields and update cohort references
    const processedStudents = studentData.map((student) => {
      const newStudent = { ...student };
      // Remove _id
      delete newStudent._id;
      // Replace cohort ID with the corresponding MongoDB ObjectId
      if (newStudent.cohort && cohortIdMap[newStudent.cohort]) {
        newStudent.cohort = cohortIdMap[newStudent.cohort];
      }
      return newStudent;
    });

    // Insert students with updated cohort references
    const students = await Student.create(processedStudents);
    console.log(`${students.length} students seeded successfully`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
