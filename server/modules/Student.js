const mongoose = require("mongoose");

//*crear un modelo
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String 
  },
  linkedinUrl: { 
    type: String 
  },
  languages: [String],
  program: { 
    type: String 
  },
  background: { 
    type: String 
  },
  image: { 
    type: String 
  },
  projects: [{ 
    type: String 
  }],
  cohort: { 
    type: Schema.Types.ObjectId, 
    ref: "Cohort"
  }
});

//* Crear y exportar el modelo Student
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;