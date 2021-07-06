
///Função do GOOGLE importada da documentacao
///https://developers.google.com/identity/sign-in/web/backend-auth
///precicsa instalar a biblioteca npm install google-auth-library --save
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client( process.argv.GOOGLE_CLIENT_ID ); ///Variavel DONTENV com a chave do google.

const googleVerify = async( idToken = '' ) => {

  const ticket = await client.verifyIdToken({
        idToken,
        audience: process.argv.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });


  const { 
     name: nombre,
     picture: img,
      email: correo ///Desestrutura para ficar igual modelo do models
    } = ticket.getPayload(); //Retrona as informações do GOOGLE SING IN
  

  return { nombre, img, correo } ;
}


module.exports = {

    googleVerify
};