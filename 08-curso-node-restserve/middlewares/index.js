
///Criação dos middlewares de forma centralizada para otimizar o codigo da aplicacao

const validarCampos  = require('../middlewares/validar-campos');
const validarJWT  = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');


module.exports = {

    ...validarCampos,
    ...validarJWT,
    ...validarRoles
}