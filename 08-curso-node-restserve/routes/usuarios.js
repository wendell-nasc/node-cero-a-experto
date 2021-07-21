
const { Router } = require('express');
const { check } = require('express-validator');

/*
//Middlewares
//Comentado as importações dos middlewares para criação de um index centralizado no middlewares

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole,tieneRole } = require('../middlewares/validar-roles');
*/



const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole

 } = require('../middlewares') ///Importa as funçoes do arquivo index do middlewares


const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');




const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');


const router = Router();


router.get('/', usuariosGet );// Controlador que executa atividad eno banco `

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
],usuariosPut );// Controlador que executa atividad eno banco 

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ), 
    validarCampos
], usuariosPost );// Controlador que executa atividad eno banco 

router.delete('/:id',[
    validarJWT, // Middleware 
    //esAdminRole, /// Middleware para valida se o usuario é o administrador do sistema
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    //validarJWT, // Mudado a ordem apenas para forçaar o erro da requsicao sem token
    check('id', 'No es un ID válido').isMongoId(),// Middleware 
    check('id').custom( existeUsuarioPorId ),// Middleware 
    validarCampos // Middleware 
],usuariosDelete ); // Controlador que executa atividad eno banco 

router.patch('/', usuariosPatch );// Controlador que executa atividad eno banco 





module.exports = router;