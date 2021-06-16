//console.log('Olá Mundo');

const http = require ('http');

http.createServer( (req, res) => {
    res.write( 'Hola Mundo');
    /// Informar node que já finalizou de screver a resposta
    res.end();
    
})
.listen ( 9090 );

console.log('EScuchando el puerto', 9090);