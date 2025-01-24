// server/app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importar CORS
const middleware = require('./middleware');
const authMiddleware = require('./authMiddleware');
const cohortRoutes = require('./routes/cohorts');
const studentRoutes = require('./routes/students');
const authRoutes = require('./routes/auth.routes');

const app = express();
const port = process.env.PORT || 5005;

// Configuración de CORS
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));

// Conectar a MongoDB
async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/cohort-tools-api');
        console.log('Database connection established!');
    } catch (err) {
        console.error('Database connection error:', err);
    }
}

// Conectar a la base de datos
connectDB();

// Usar middleware global 
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api/cohorts', authMiddleware, cohortRoutes); // Protegemos las rutas si es necesario
app.use('/api/students', authMiddleware, studentRoutes); // Protegemos las rutas si es necesario

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

