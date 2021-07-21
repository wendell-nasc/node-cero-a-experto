//Nativos
const { Router } = require('express');
const { check } = require('express-validator');

//Criados
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post('/login', [

    //Criação dos middlewares
    check( 'correo', 'El correo es obligatorio').isEmail(),
    check( 'password', 'El contraseña es obligatorio').not().isEmpty(),

    validarCampos
] ,
 login  );





module.exports = router;