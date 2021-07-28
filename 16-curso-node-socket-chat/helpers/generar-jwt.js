const jwt = require('jsonwebtoken');

const { Usuario } = require('../models');
const usuario = require('../models/usuario');



const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}


///Função para comprovarJWT
const comprobarJWT = async ( token = '' ) => {

    try {
       
        //token nullo
        if ( token.length < 10 ){
            return null;
        }

        ///Descriptografar o token
        const { uid } = jwt.verify ( token, process.env.SECRETORPRIVATEKEY )

        const usuario = await Usuario.findById( uid ); ///Pesquisa o usuario do banco para verificar se ele existe

        if ( usuario ){ ///Se o osuario existe, ou seja, seja verdadeiro..
           
           if (usuario.estado ) { ///Valida se o campo estado está VERDADEIRO (TRUE BOOLEANO)
            return usuario;

           }else {
            return null;   
           }

        }else{
            return null;
        }
        
    } catch (error) {
        
        return null; /// qualquer erro no Try cai aqui e retorna nulo
        
    }
}


module.exports = {
    generarJWT,
    comprobarJWT
}

