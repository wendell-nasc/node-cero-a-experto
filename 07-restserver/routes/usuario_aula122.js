///Desestrutura o express e tras apenas a função Router
const { Router } =  require('express');
/// Utilizada para fazer validações dos campos atraves do middlware....
const { check } = require('express-validator');




///Importar e destrutura a função dos controladores
const { usuarioGet,usuarioPut,usuarioPost,
    usuarioDelete,usuarioPatch} =  require( '../controllers/usuarios_aula122' );


///chamar a função  Router
const router = Router();

////GET 
///Executa a referencia dos controllers
router.get('/', usuarioGet);

////PUT 
///Executa a referencia dos controllers... O id precisa ser dinamico ou fixo para funcionar
router.put('/:id', usuarioPut);

////POST 
///O check é utilizada no middleware no terceiro argumento para fazer checagem se o valor é valido
router.post('/',
    [
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),///Valida se o campo não está vazio
    check('password', 'El password es Obligatorio y más de 6 letras').isLength( { min: 6 }),///Valida a quantidade minima de caracteres
    check('correo', 'El correo no es válido').isEmail(),///valida o campo de e-mail
    check('role', 'No es un role valido').isIn( ['ADMIN_ROLE','USER_ROLE']),///valida o campo de e-mail
    ],
    usuarioPost);

////DELETE 
///Executa a referencia dos controllers
router.delete('/', usuarioDelete);


////Patch 
///Executa a referencia dos controllers
router.patch('/', usuarioPatch);




///Exportar o router
module.exports = router;



