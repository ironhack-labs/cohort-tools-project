const mongoose = require('mongoose');

const cohortSchema = new mongoose.Schema({
    cohortSlug: { type: String },  // Opcional, para identificar cohortes
    cohortName: { type: String },   // Opcional, nombre descriptivo de la cohorte
    program: { type: String },       // Opcional, el programa de estudio
    format: { type: String },        // Opcional, formato de la clase (Full Time, Part Time)
    campus: { type: String },        // Opcional, ubicación del campus
    startDate: { type: Date, default: Date.now }, // Fecha de inicio, por defecto la fecha actual
    endDate: { type: Date },         // Opcional, fecha de finalización
    inProgress: { type: Boolean, default: false }, // Estado de la cohorte
    programManager: { type: String }, // Opcional, nombre del gestor del programa
    leadTeacher: { type: String },    // Opcional, nombre del profesor principal
    totalHours: { type: Number, default: 360 }, // Total de horas del curso, valor por defecto
});

module.exports = mongoose.model('Cohort', cohortSchema);
