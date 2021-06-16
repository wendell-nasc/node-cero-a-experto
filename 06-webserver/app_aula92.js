const express = require('express')
const app = express()

const port = 8080;
 
//TODO: require ('hb')-->handlebars
app.set('view engine', 'hbs');


///Servidor contenido estático... especificar o path da pasta public com o arquivo html
///equivale a rota '/'
app.use( express.static ('public'));


//Usar handlebars para renderizar as paginas

app.get('/',  (req, res) => { 
  res.render('home', { 
    nombre: 'Wendel Silva',
    titulo: 'Curso de Node'
  });
});

///colocar URL sem a extensão do arquivo ex. index.html

/*
app.get('/home',  (req, res) => { 
  res.sendFile( __dirname + '/public/templates/index.html')
})
*/

///colocar URL sem a extensão do arquivo ex. index.html

app.get('/generic',  (req, res) => { 
  res.sendFile( __dirname + '/public/templates/generic.html')
})


///colocar URL sem a extensão do arquivo ex. index.html

app.get('/elements',  (req, res) => { 
  res.sendFile( __dirname + '/public/templates/elements.html')
})


/*
///Definir a rota hola mundo ex 3
app.get('*',  (req, res) => { 
  ///Pode-se enviar o arquivo da pagina para exibir através do comando sendFile
  res.sendFile( __dirname + '/public/templates/generic.html')
})
*/


/// Chamar porta com callback
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


///subir aplicaçãosem callback

//app.listen(8080)