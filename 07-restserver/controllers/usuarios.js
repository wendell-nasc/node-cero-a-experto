///Importa as variaveis de entorno do dotenv
require('dotenv').config();

///Desestrutura do express para receber as informalçies di response e request
const { response, request } = require ('express');
///Encriptrografar senhas
const bcryptjs = require('bcryptjs');

///Importar os modelos para salvar no banco de dados mongooose
const Usuario = require ('../models/usuario');
//const Usuario = require (process.env.appmodels1);

/// Utilizada para fazer validações dos campos atraves do middlware....
///Foi removida para o arquivo middlwares
///const { validationResult } = require('express-validator');





////GET 
///Define uma constant para o metodo usuarioGet... res=response é importado do express logo acima
const usuarioGet =  async (req = request, res = response ) => { 
    ///Recebe todas informações enviadas nos paramatros
    //const query = req.query; //http://localhost:8084/api/usuarios?q=hola&nombre=wendell&apikey=123456
   
   ///Desestruturada
   // const { q, nombre, apikey } = req.query;
    //Pode ser desestrutura e definido valor nulo para variavel qdo não é enviado nada ... importante !!!!
   /// const { q='' , nombre='No name', apikey= '',page= 1, limit="10" } = req.query; // comentado para ficar como refencia para envio e recebimento de parametros


   const { limite = 5, desde = 0 } = req.query; ///Desestrutura o limite enviado pelo frontal e define valor default se não é enviado
    
   /*
   const usuarios = await Usuario.find( { estado : true} ) //Get e busca de todos os usuarios do banco
    /// O parametro estado = true  só retorna os registros que não foram excluidos fisicamente do banco
   .skip ( Number( desde )) /// A função skip é para informar desde qual posição de registro do bancos é para retornar
   .limit( Number(limite) ); /// A função limit determina o limite registros retornados para o forntal
        //Number transformar o limite de string para numero


    const total =    await Usuario.countDocuments( { estado : true} ); /// O metodo countDocuments é usado para contar a qtde de registros
    /// O parametro estado = true  só retorna os registros que não foram excluidos fisicamente do banco
    /// Ele criou uma constante para armazenar o estado = true --> const query = { estado true }

*/  

/// O professor excluiu o trecho do codigo acima e substitui pelo debaixao por conta dos dois await... ele explicou se são usados separados o sistema fica aguardndo um retorno que é acumulatibo, ou seja, se um demora 5 s e o outro 10 o total de tempo de espera sera de 15


    //const resp = await Promise.all ([ //// O Promise.all é usado para dispara mais de um wait para otimizar a consulta
    const [ total, usuarios ]= await Promise.all ([ //Usuario a desestruturação para dar nome as posiçoes dos arrays
    Usuario.countDocuments( { estado : true} ),
    Usuario.find( { estado : true} )
    .skip ( Number( desde )) 
    .limit( Number(limite) )     


]);
    
        res.json({ 
            ///resp --> devido a desestruturação, usou total e usuarios

            total,
            usuarios
           
        });
    };

    ////PUT 
    ///Define uma constant para o metodo usuarioGet... res=response é importado do express logo acima
    
  
    const usuarioPut =  async (req, res = response ) => { 
    
        ///Recebe todas informações enviadas nos paramatros
        const { id }= req.params;
        const { _id, password, google, correo, ... resto } = req.body; //Remove as informações da request

        /// TODO validar contra base de datos
        if ( password ) { ///Encriptogra a senha alterada de novo
                // Encriptar la contraseña
                const salt = bcryptjs.genSaltSync(); ///Metodo para definir a dificuldade de encriptrografação
                resto.password = bcryptjs.hashSync( password, salt);/// Encriptografar em uma unica via


        }
         /// Funcação findByIdAndUpdate do Mongoose busca pelo id e atualiza
         ///useFindAndModify utiliza essa funcao da base de dados
        const usuario = await Usuario.findByIdAndUpdate( id, resto ); ///Atualiza e armazena as informações para retornar


        ///Recebe todas informações enviadas nos paramatros desestruturada
        ///const { id } = req.params;      
        
    res.json({ 
        ///msg: 'put API - controlador', ///excluido
        usuario /// Retorna as informaçoes atualizadas para o frontal, NO CURSO FOI COMENTADO E EXCLUIDO
        //FICOU ASSIM
        //res.json(usuario); ///enviando apenas o objeto sem os parametros msg e usuario
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

   /*
    const existeEmail = await Usuario.findOne({ correo:correo  }); ///findOne verifica se o correo buscado existe no banco de dados
        if ( existeEmail ){

            return res.status(400).json({

                msg: 'Ese correo ya está registrado'
            });
        }
    
        */

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); ///Metodo para definir a dificuldade de encriptrografação
    usuario.password = bcryptjs.hashSync( password, salt);/// Encriptografar em uma unica via

    // guardar en BD


   
    await usuario.save() /// Gravar o registro

    
    //Exemplo desestruturar do body o que necessita\
    ///const { nombre, edad } = req.body;
    
    res.json({ 
        //msg: 'post API - controlador',
        usuario /// Mostra a informação do usuario
    });
   };



   ////DELETE 
///Define uma constant para o metodo usuarioGet... res=response é importado do express logo acima
const usuarioDelete =  async (req, res = response ) => { 
    
    const { id } = req.params;




    //FISICAMENTE LO BORRAMOS
    
    //const usuario = await Usuario.findByIdAndDelete ( id ); /// Função findByIdAndDelete é usada para excluir o registro da base
    const usuario = await Usuario.findByIdAndUpdate ( id, { estado: false}  ); /// Edita o registro para criar uma exclusão logica, diferente do metodo acima



    res.json({ 
        //msg: 'delete API - controlador'
    //id

    usuario /// retona os dados do registro excluido da base mongoose


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