const { Router } = require('express');
const { check } = require('express-validator');
const { cargaArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');


const { validarCampos, validarArchivoSubir } = require('../middlewares');




const router = Router();



router.post( '/', validarArchivoSubir, cargaArchivo )

router.put('/:coleccion/:id',
[
validarArchivoSubir,
check('id', 'El id debe de ser de mongo').isMongoId(),
check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])), //Revisar conexao dentro do array dos endpoints existentes, está dentro de helpers > dbvalidators
validarCampos
], 
//actualizarImagen
actualizarImagenCloudinary )



router.get('/:coleccion/:id',
[
check('id', 'El id debe de ser de mongo').isMongoId(),
check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])), //Revisar conexao dentro do array dos endpoints existentes, está dentro de helpers > dbvalidators
validarCampos
], 
mostrarImagen )

module.exports = router;