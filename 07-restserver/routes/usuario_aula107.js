///Desestrutura o express e tras apenas a função Router
const { Router } =  require('express');

///Importar e destrutura a função dos controladores
const { usuarioGet,usuarioPut,usuarioPost,usuarioDelete,usuarioPatch} =  require( process.env.approutes1 );


///chamar a função  Router
const router = Router();

////GET 
///Executa a referencia dos controllers
router.get('/', usuarioGet);

////PUT 
///Executa a referencia dos controllers... O id precisa ser dinamico ou fixo para funcionar
router.put('/:id', usuarioPut);

////POST 
///Executa a referencia dos controllers
router.post('/', usuarioPost);

////DELETE 
///Executa a referencia dos controllers
router.delete('/', usuarioDelete);


////Patch 
///Executa a referencia dos controllers
router.patch('/', usuarioPatch);




///Exportar o router
module.exports = router;



