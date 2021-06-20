const { response } = require ('express');

////GET 
///Define uma constant para o metodo usuarioGet... res=response é importado do express logo acima
const usuarioGet =  (req, res = response ) => { 
    
     res.json({ 
         msg: 'get API - controlador'
     });
    };

    ////PUT 
///Define uma constant para o metodo usuarioGet... res=response é importado do express logo acima
const usuarioPut =  (req, res = response ) => { 
    
    res.json({ 
        msg: 'put API - controlador'
    });
   };


   ////POST 
///Define uma constant para o metodo usuarioGet... res=response é importado do express logo acima
const usuarioPost =  (req, res = response ) => { 
    
    res.json({ 
        msg: 'post API - controlador'
    });
   };



   ////DELETE 
///Define uma constant para o metodo usuarioGet... res=response é importado do express logo acima
const usuarioDelete =  (req, res = response ) => { 
    
    res.json({ 
        msg: 'delete API - controlador'
    });
   };



   ////PATCH
///Define uma constant para o metodo usuarioGet... res=response é importado do express logo acima
const usuarioPatch =  (req, res = response ) => { 
    
    res.json({ 
        msg: 'get API - controlador'
    });
   };

    
    
    
    
    
    
    module.exports = { usuarioGet,usuarioPut,usuarioPost,usuarioDelete,usuarioPatch} /// Chaves bigode é usado para exportar muitas funcoes de controladores