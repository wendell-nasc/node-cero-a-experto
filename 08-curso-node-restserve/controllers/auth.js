const { response } = require("express");
const bcryptjs = require ('bcryptjs');

const Usuario = require('../models/usuario'); ///Importar usuario do banco para verificar as informações
const { generarJWT } = require("../helpers/generar-jwt");



const login = async (req, res = response ) => {

    const { correo, password } = req.body; /// Capturar o correo e password enviado pela requisição postman

 

    try {


        //Verificar si el email existe
        
        const usuario = await Usuario.findOne({ correo }); //Amarzena os dados do usuarioe Valida  se o e-mail existe no banco

        if ( !usuario ) {
            return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - correo'
            });
        
        };
          
        

        //SI el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - estado: false/'
            });
             };





        ///Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password ); 
        //A função compareSync da biblioteca compara as senhas e regressa um booleano
        if ( !validPassword ) {
            return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - password/'
            });
             };



        //Generar el JWT

        const token = await generarJWT ( usuario.id ); /// /A função generarJWT foi criada no helps manualmente e não é nativa do package jsonwebtoken


       

        res.json({
            //msg: 'Login ok',
            //correo, password ///Exempplo para devolver pro front end as informações capturadas
            usuario,
            token
        });
    
        
    } catch (error) {
        console.log(error); /// Exibe o erro 
        return res.status(500).json ({ ///Devolve pro frontend o erro 500
            msg: 'Algo Saiu mal. Hable com el administrador'  
        });
        
    }





   

}

module.exports= {
    login

}