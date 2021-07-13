const { Router } = require('express');
const { buscar } = require('../controllers/buscar');

const router = Router();

router.get('/:coleccion/:termino', buscar ) // Buscar por entidade e registros








module.exports = router;
