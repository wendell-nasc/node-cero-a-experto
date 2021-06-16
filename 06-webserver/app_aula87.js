//console.log('Olá Mundo');

const http = require ('http');


/// request (req) pode ser qualquer dispositivplano que requisite alguma coisa
/// response (res) é o que eu respondo

http.createServer( (req, res) => {
    
    ///verificar no console as informações
    console.log (req);

    ///Enviar codigo de erro
    //res.writeHead(404);

    ///Enviar codigo de sucesso - Exemplo 1
    ///res.writeHead(200);

    ///Enviar codigo de sucesso - Exemplo 2 .... aparece no response headers do navegador
    //res.writeHead(200, { 'Content-Type': 'text/plain'});

    ///Enviar codigo de sucesso - Exemplo 3
    //res.writeHead(200, { 'Content-Type': 'application/json'});

    /// Atribui um nome ao arquivo CSV para ser baixado pelo navegador
    res.setHeader('Content-Disposition', 'attachment; filename=lista.csv')

  ///Enviar codigo de sucesso - Exemplo 4 - arquivo limitado por virgula ( coma )
    res.writeHead(200, { 'Content-Type': 'application/csv'});

    ///Enviar um JSON

    const persona = { 
        id: 1,
        nombre: 'wendell'


    }

    ///Enviar codigo de criado algo/registro com suceso
    //res.writeHead(201);

    ///Mensgem de erro -Exemplo 0
   // res.write( 'Hola Mundo');
    
    ///Mensgem de erro -Exemplo 1
   // res.write( '404 | Pagina não encontratada')

    ///Mensgem de erro -Exemplo 2
   // res.write( JSON.stringify ( persona ) );

    ///Mensgem de erro -Exemplo 2
    res.write('id, nombre \n ');
    res.write('1, fernandi \n ');
    res.write('2, maria \n ');
    res.write('3, wendell \n ');
    res.write('4, wendell \n ');
    res.write('5, wendell \n ');
    res.write('6, wendell \n ');


  


    /// Informar node que já finalizou de screver a resposta
    res.end();
    
})
.listen ( 9090 );

console.log('EScuchando el puerto', 9090);