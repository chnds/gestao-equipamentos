const express = require('express');
const router = express.Router();
const lensController = require('../controllers/LensController'); // Caminho correto

// Certifique-se que getAllLenses está sendo importado corretamente
router.get('/', lensController.getAllLensesUsingService);

module.exports = router;