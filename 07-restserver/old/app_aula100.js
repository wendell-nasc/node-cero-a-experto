require('dotenv').config()
const express = require('express')
const app = express()
 

///SUBSTITUDI PELO DOTENV
///const port = 8080;
const port = process.env.PORT;


app.get('/',  (req, res) => { 
    res.send('Olá Mundo!');
  });
 
/// Chamar porta com callback
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

console.log('Olá Mundo!');