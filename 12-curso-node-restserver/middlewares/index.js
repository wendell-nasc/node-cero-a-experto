

const validaCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const tieneCategoria = require('../middlewares/validar-categorias');



module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
    ...tieneCategoria
}