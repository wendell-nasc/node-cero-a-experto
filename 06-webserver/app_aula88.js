const express = require('express')
const app = express()

const port = 8080;
 

///Definir a rota hola mundo ex 1
app.get('/',  (req, res) => { 
  res.send('Home page')
})
 

///Definir a rota hola mundo ex 2
app.get('/hola-mundo',  (req, res) => { 
  res.send('Home page hola mundo')
})

///Definir a rota hola mundo ex 3
app.get('*',  (req, res) => { 
  res.send('404 | Page not found redigida')
})



/// Chamar porta com callback
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


///subir aplicaçãosem callback

//app.listen(8080)