const { argv } = require('./config/yargs_estudo_38.js');  
const { crearArchivo } = require('./helpers/multiplicar_estudo_38.js');  

const colors = require('colors');    

console.clear();


console.log( argv );

crearArchivo( argv.b,  argv.l , argv.h)
.then( nombreArchivo => console.log(nombreArchivo.rainbow, `creado`))
.catch( err => console.log(err) );


    
   // fs.writeFileSync(`tabla-${ base }.txt`, salida, (err) => {
        //if(err) throw err;
       // console.log(`tabla-${ base } creado`);
       // })
