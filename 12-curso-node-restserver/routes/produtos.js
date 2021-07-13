
const { Router } = require('express');
const { check } = require('express-validator');

const { esRoleValido, emailExiste, existeUsuarioPorId, existeProdutoPorId, existeCategoriaPorId} = require('../helpers/db-validators');




const { 
    produtosPost, 
    produtosGet,
    produtosPut,
    produtosDelete,
    obtenerProdutos
} = require('../controllers/produtos');



const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole  
} = require('../middlewares');


const router = Router();

/*
//Obtener todas las produtoss - publico
router.get ('/', (req, res ) => {
    res.json('get')
})
*/

//Obtener todas las produtoss - publico
router.get('/', produtosGet );




/*
//Obtener una produtos por id - publico
router.get ('/:id', (req, res ) => {
    res.json('get id')
})
*/

//Obtener una produtos por id - publico
router.get('/:id',[
    check('id', 'El id es obligatorio').not().isEmpty(),    
    //check('id', 'No es un ID válido').isMongoId(),
    check('id').custom ( existeProdutoPorId ),
    validarCampos
], obtenerProdutos );

/*
crear  produtos - privado - cualquier persona con token válido
router.post ('/', (req, res ) => {
    res.json('post')
})
*/

//crear  produtos - privado - cualquier persona con token válido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),   
    check('categoria','Noa es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    //tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),      
    validarCampos
], produtosPost );



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
    check('id').custom( existeProdutoPorId ),    
    validarCampos
],produtosPut );



/*
//Borrar una produtos - Admin
router.delete ('/:id', (req, res ) => {
    res.json('delete')
})
*/

//Borrar una produtos - Admin

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    //tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProdutoPorId ),
    validarCampos
],produtosDelete );



module.exports = router;