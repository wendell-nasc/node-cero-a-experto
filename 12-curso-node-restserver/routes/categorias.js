
const { Router } = require('express');
const { check } = require('express-validator');

const { esRoleValido, emailExiste, existeUsuarioPorId, existeCategoriaPorId } = require('../helpers/db-validators');

const { 
    categoriasPost, 
    categoriasGet,
    categoriasPut,
    categoriasDelete,
    obtenerCategoria
} = require('../controllers/categorias');


const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole,
    tieneCategoria    
} = require('../middlewares');


const router = Router();

/*
//Obtener todas las categorias - publico
router.get ('/', (req, res ) => {
    res.json('get')
})
*/

//Obtener todas las categorias - publico
router.get('/', categoriasGet );




/*
//Obtener una categoria por id - publico
router.get ('/:id', (req, res ) => {
    res.json('get id')
})
*/

//Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'El id es obligatorio').not().isEmpty(),    
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom ( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria );

/*
crear  categorias - privado - cualquier persona con token válido
router.post ('/', (req, res ) => {
    res.json('post')
})
*/

//crear  categorias - privado - cualquier persona con token válido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  //  check('usuario').custom( existeUsuarioPorId ),    
    //check('usuario').custom( esRoleValido ), 
    //tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),      
    validarCampos
], categoriasPost );



/*
//Actualizar - privado - cualquierra con token válido
router.put ('/:id', (req, res ) => {
    res.json('put')
})
*/


//Actualizar - privado - cualquierra con token válido
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),    
    validarCampos
],categoriasPut );



/*
//Borrar una categoria - Admin
router.delete ('/:id', (req, res ) => {
    res.json('delete')
})
*/

//Borrar una categoria - Admin

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    //tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],categoriasDelete );



module.exports = router;