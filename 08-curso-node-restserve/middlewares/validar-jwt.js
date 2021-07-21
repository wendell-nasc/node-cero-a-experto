const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next ) => {

    const token = req.header('x-token'); ///recebe do front end o token enviado com o nome x.token

    //console.log('token');//imprime

    if ( !token ) { ///Valida se tem token a peticion

        return res.status(401).json({

            msg: 'No hay token en la petición'
        });
    }
    
    try {

        /*
        const payload  = jwt.verify ( token, process.env.SECRETORPRIVATEKEY ); //Função jwt.verify para verificar o JWT JSON WEB TOKEN
        console.log( payload );
        */
        const { uid } = jwt.verify ( token, process.env.SECRETORPRIVATEKEY ); // Extrai o uid enviado pelo usuario ...Função jwt.verify  para verificar o JWT JSON WEB TOKEN

        //Leer el usuario que corresponde al uid       
        req.uid = uid; // Inclui o uui do usuario  Envia para o controllers o uid do usuario, no caso o delete
    
        // console.log( uid );        
        const usuario = await Usuario.findById( uid ); //A findById valida o   id do usuario JWT na base de dados

        //Valida o se o usuario existe no banco de dados, se FALSE segue o IF
        if ( !usuario ){ 
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB '

            })
        }


        //Valida o se estado do usuario está inativo
        if ( !usuario.estado ){ 
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false '

            })
        }

        
        req.usuario = usuario; /// Criação do usuário autenticado 



        next();
   

     
        
        //  

       // req.uid = uid; /// 

        

        
    } catch (error) {

        console.log( error );
        res.status(401).json({
            msg: 'Token no es válido'

        });
        
    }
    
 



}

module.exports ={

        validarJWT
}