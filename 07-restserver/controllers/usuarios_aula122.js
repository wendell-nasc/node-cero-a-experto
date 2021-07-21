///Importa as variaveis de entorno do dotenv
require('dotenv').config();

///Desestrutura do express para receber as informalçies di response e request
const { response, request } = require ('express');
///Encriptrografar senhas
const bcryptjs = require('bcryptjs');

///Importar os modelos para salvar no banco de dados mongooose
const Usuario = require ('../models/usuario_aula122');
//const Usuario = require (process.env.appmodels1);

/// Utilizada para fazer validações dos campos atraves do middlware....
///Foi removida para o arquivo middlwares
///const { validationResult } = require('express-validator');





////GET 
///Define uma constant para o metodo usuarioGet... res=response é importado do express logo acima
const usuarioGet =  (req, res = response ) => { 
    ///Recebe todas informações enviadas nos paramatros
    const query = req.query; //http://localhost:8084/api/usuarios?q=hola&nombre=wendell&apikey=123456
   
   ///Desestruturada
   // const { q, nombre, apikey } = req.query;
    //Pode ser desestrutura e definido valor nulo para variavel qdo não é enviado nada ... importante !!!!
    const { q='' , nombre='No name', apikey= '',page= 1, limit="10" } = req.query;
     res.json({ 
         msg: 'get API - controlador',
         q,
         nombre,
         apikey,
         page,
         limit,
         query
     });
    };

    ////PUT 
    ///Define uma constant para o metodo usuarioGet... res=response é importado do express logo acima
    
  
    const usuarioPut =  (req, res = response ) => { 
    
        ///Recebe todas informações enviadas nos paramatros
        const id = req.params;
        ///Recebe todas informações enviadas nos paramatros desestruturada
        ///const { id } = req.params;
        
        
    res.json({ 
        msg: 'put API - controlador',
        id
    });
   };


   ////POST 
    ///Define uma constant para o metodo usuarioGet... res=response é importado do express logo acima
    const usuarioPost = async (req, res = response ) => {

      /*
        ///Recebe os erros reportados do arquivo de routes
      ///Foi removido para middlwares > validar-campos.js
    const errors = validationResult( req ); 
        if( !errors.isEmpty() ) {
            return res.status(400).json( errors );

        }
    
      */
        
    ///Recebe as informações da request enviada pelo front end
    ///const body = req.body;
    const { nombre, correo, password, role }  = req.body; //Desestruturar o body
    ///Estancia a classe de models usuario 
    //const usuario = new Usuario( body ); /// Gravar a instancia
    /// Gravar a instancia desestruturadp
    ///Precisa por bigote {} senão não funciona
    const usuario = new Usuario( { nombre, correo, password, role }  ); 



    //Verificar si el correo existe
    
   //Função para validar se existe o e-mail com a mesma informação cadastrada anteriormente

   
    const existeEmail = await Usuario.findOne({ correo:correo  }); ///findOne verifica se o correo buscado existe no banco de dados
        if ( existeEmail ){

            return res.status(400).json({

                msg: 'Ese correo ya está registrado'
            });
        }
    


    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); ///Metodo para definir a dificuldade de encriptrografação
    usuario.password = bcryptjs.hashSync( password, salt);/// Encriptografar em uma unica via

    // guardar en BD




   
    await usuario.save() /// Gravar o registro

    
    //Exemplo desestruturar do body o que necessita\
    ///const { nombre, edad } = req.body;
    
    res.json({ 
        msg: 'post API - controlador',
        usuario /// Mostra a informação do usuario
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