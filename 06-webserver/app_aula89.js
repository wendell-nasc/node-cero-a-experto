const express = require('express')
const app = express()

const port = 8080;
 


///Servidor contenido estático... especificar o path da pasta public com o arquivo html
///equivale a rota '/'
app.use( express.static ('public'))



///Depois de definido o path pelo comando expres..static, da pasta publico, qualquer pasta com o nome da rota abre

app.get('/hola-mundo',  (req, res) => { 
  res.send('Home page hola mundo')
})

///Definir a rota hola mundo ex 3
app.get('*',  (req, res) => { 
  ///Pode-se enviar o arquivo da pagina para exibir através do comando sendFile
  res.sendFile( __dirname + '/public/404.html')
})



/// Chamar porta com callback
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


///subir aplicaçãosem callback

//app.listen(8080)