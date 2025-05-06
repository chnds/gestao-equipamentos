// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const lensRoutes = require('./routes/lensRoutes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/lenses', lensRoutes);

module.exports = app;
