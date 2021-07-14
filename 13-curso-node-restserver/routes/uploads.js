const { Router } = require('express');
const { check } = require('express-validator');
const { cargaArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');


const { validarCampos } = require('../middlewares');




const router = Router();



router.post( '/', cargaArchivo )

router.put('/:coleccion/:id', [
check('id', 'El id debe de ser de mongo').isMongoId(),
check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'produtos'])), //Revisar conexao dentro do array dos endpoints existentes
validarCampos
], 
actualizarImagen )


module.exports = router;