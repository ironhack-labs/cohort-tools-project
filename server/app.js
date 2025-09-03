const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// core middleware
app.use(express.json());
app.use('/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/users.routes'));

// routes
app.use('/api/cohorts', require('./routes/cohorts.routes'));
app.use('/api/students', require('./routes/students.routes'));

// 404 (after routes)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// error handler (last)
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
  if (err.name === 'CastError') return res.status(400).json({ error: 'Invalid ID format' });
  res.status(500).json({ error: 'Internal server error' });
});

// bootstrap
const port = process.env.PORT || 5005;
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cohort-tools-api';

mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('Mongo error:', err);
    process.exit(1);
  });
