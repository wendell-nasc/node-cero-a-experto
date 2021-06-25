
///Desestrutura o express e tras apenas a função Router
const { Router } =  require('express');
/// Utilizada para fazer validações dos campos atraves do middlware....
const { check } = require('express-validator');



///Importa a validação dos campos do middlewares
const { validarCampos } = require('../middlewares/validar-campos');
///Importa função de role validar campos de helpers 
const { esRoleValido, esCorreoValido, existeUsuarioPorId } = require('../helpers/db-validators');


///Importar e destrutura a função dos controladores
const { usuarioGet,usuarioPut,usuarioPost,
    usuarioDelete,usuarioPatch} =  require( '../controllers/usuarios' );



    


///chamar a função  Router
const router = Router();

////GET ////////////////////////////////////////////////
///Executa a referencia dos controllers
router.get('/', usuarioGet);




////PUT ////////////////////////////////////////////////

///Executa a referencia dos controllers... O id precisa ser dinamico ou fixo para funcionar
router.put('/:id', [  //Inicia o middleware para validar as informações
    check ('id', 'No es un ID válido').isMongoId(), /// Valida se o ID é um id valido do MONGODB
    check( 'id' ).custom( existeUsuarioPorId ), 
    validarCampos ////// Chama função do middleware para validar os campos dos parametros passados
],
             ///Fim Middleware
usuarioPut);





////POST 
///O check é utilizada no middleware no terceiro argumento para fazer checagem se o valor é valido
router.post('/',
    [
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),///Valida se o campo não está vazio
    
    check('password', 'El password es Obligatorio y más de 6 letras').isLength( { min: 6 }),///Valida a quantidade minima de caracteres

    check('role','El password es Obligatorio y más de 6 letras').custom( esRoleValido ), //Ex. 1 Sem callback Recortou a função de validação de role para centralizar na pasta helpers
  
    check('correo','El correo no es válido').custom(  (correo) => esCorreoValido(correo) ).isEmail(),
    
    validarCampos/// Chama função do middleware para validar os campos dos parametros passados
    ],
    usuarioPost); ///Executa o controlador depois de percorrer as validacoes

////DELETE 
///Executa a referencia dos controllers
router.delete('/', usuarioDelete);


////Patch 
///Executa a referencia dos controllers
router.patch('/', usuarioPatch);




///Exportar o router
module.exports = router;



