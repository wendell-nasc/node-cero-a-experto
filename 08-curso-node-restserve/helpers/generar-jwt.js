const jwt = require ( 'jsonwebtoken'); //importa o package jsonwebtoken

const generarJWT =  ( uid = '' ) => { ///recebe o UID (identificador unico do usuario), unico a ser sexibido

return new Promise( ( resolve, reject ) => {

    const payload = { uid } /// Pode colocar qualquer informação para mnanusear. Porem, será usada apenas o UID
    jwt.sign ( payload, process.env.SECRETORPRIVATEKEY,  { /// Definido variavel .env  para amarzenar a chave SECRETORPRIVATEKEY=Est03sMyPub1cK3y23@913
   
        expiresIn: '4h' ///tempo para expirar a chave

    }, ( err, token ) => {
    
        if ( err ) {
            console.log( err ); ///Exibe o erro que ocorreu
            reject( 'No se pudo generar el token ')
        }else{

            resolve ( token ) ; ///Se tudo saiu bem manda executar o token
        }

    }

        ) 
    
})

}

module.exports = {
    generarJWT

}