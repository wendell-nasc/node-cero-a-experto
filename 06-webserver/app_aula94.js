
const express = require('express');
var hbs = require('hbs');
///configurar variaveis de entorno para ler as chaves ... o arquivo TXT foi alterado para .env  para ficar um path do caminho
require('dotenv').config()

const app = express();

///SUBSTITUDI PELO DOTENV
///const port = 8080;
const port = process.env.PORT;
 
//TODO: require ('hb')-->handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

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

//Usar handlebars para renderizar as paginas

app.get('/home',  (req, res) => { 
  res.render('home', { 
    nombre: 'Wendel Silva',
    titulo: 'Curso de Node'
  });
});


//Usar handlebars para renderizar as paginas

app.get('/elements',  (req, res) => { 
  res.render('elements', { 
    nombre: 'Wendel Silva',
    titulo: 'Curso de Node'
  });
});


//Usar handlebars para renderizar as paginas

app.get('/generic',  (req, res) => { 
  res.render('generic', { 
    nombre: 'Wendel Silva',
    titulo: 'Curso de Node'
  });
});




///colocar URL sem a extensão do arquivo ex. index.html

/*
app.get('/home',  (req, res) => { 
  res.sendFile( __dirname + '/public/templates/index.html')
})


///colocar URL sem a extensão do arquivo ex. index.html

app.get('/generic',  (req, res) => { 
  res.sendFile( __dirname + '/public/templates/generic.html')
})


///colocar URL sem a extensão do arquivo ex. index.html

app.get('/elements',  (req, res) => { 
  res.sendFile( __dirname + '/public/templates/elements.html')
})
*/

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