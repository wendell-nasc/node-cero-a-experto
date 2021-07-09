
const { Router } = require('express');
const { check } = require('express-validator');

const { esRoleValido, emailExiste, existeUsuarioPorId, existeCategoriaPorId } = require('../helpers/db-validators');

const { 
    categoriasPost, 
    categoriasGet,
    categoriasPut,
    categoriasDelete,
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
    validarCampos
], tieneCategoria );

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
    // esAdminRole,
   // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],categoriasDelete );

/*


const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
],usuariosPut );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ), 
    validarCampos
], usuariosPost );

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );


*/


module.exports = router;