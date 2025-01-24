const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: { type: String },  // Opcional, nombre del estudiante
    lastName: { type: String },   // Opcional, apellido del estudiante
    email: { type: String, unique: true },  // Debe ser único, se utiliza para identificar al estudiante
    phone: { type: String },       // Opcional, número de teléfono del estudiante
    linkedinUrl: { type: String, default: "" }, // URL de LinkedIn opcional
    languages: { type: [String] }, // Opcional, lista de idiomas que habla el estudiante
    program: { type: String },      // Opcional, el programa de estudio
    background: { type: String, default: "" }, // Opcional, antecedentes del estudiante
    image: { type: String, default: "https://i.imgur.com/r8bo8u7.png" }, // Imagen por defecto
    cohort: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort' }, // Referencia a la cohorte del estudiante
    projects: { type: [String] }, // Opcional, lista de proyectos
});

module.exports = mongoose.model('Student', studentSchema);

