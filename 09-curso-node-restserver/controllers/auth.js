const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
      
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // SI el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}


const googleSignin = async(req, res = response) => {

    const { id_token } = req.body;

    
    
    try {  

    //const googleUser = await googleVerify ( id_token ); ///chama a função do google de helpers 
    
    //Desestrutura a variavel enviada
    const { correo, nombre, img } = await googleVerify ( id_token ); 

     // console.log ( { correo, nombre, img } );
    //gerar referencia para ver se o email existe no banco o email
    
    let usuario = await Usuario.findOne({ correo });

     if ( !usuario ) {
        //se o usuario não existe tem que criar
         const data = {
                nombre,
                correo,
                password:`:P`,///nÃO É NECESSARIO CADATRAR SENHA,
                img,
                rol: 'USER_ROLE',
                google: true
           };
           //Gravrar o usuario no banco de dados caso não exista
           
        //console.log( data );
        usuario = new Usuario( data );
        await usuario.save();

        };

        /// se el usuario existe en DB
        if ( !usuario.estado ) { //usuario estado diferente de verdadeiro (booleano) {
            return res.status(401).json({

                msg: 'Hable con el administrador , usuario bloqueado'

            });
        };

        //Generar el JWT
        const token = await generarJWT( usuario.id )


   /// console.log ( googleUser );


    res.json({
        usuario,
        token
        //msg: 'Todo ok! google signin',
        //id_token
    });


} catch (error) {
    res.status(400).json({

        msg: 'Token de google no es válido'
    })
}

}






module.exports = {
    login,
    googleSignin
}
