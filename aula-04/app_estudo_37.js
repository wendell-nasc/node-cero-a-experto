const { argv } = require('./config/yargs_estudo_37.js');  
const { crearArchivo } = require('./helpers/multiplicar_estudo_37.js');  

const colors = require('colors');    

console.clear();


console.log( argv );

crearArchivo( argv.b,  argv.l )
.then( nombreArchivo => console.log(nombreArchivo.rainbow, `creado`))
.catch( err => console.log(err) );


    
   // fs.writeFileSync(`tabla-${ base }.txt`, salida, (err) => {
        //if(err) throw err;
       // console.log(`tabla-${ base } creado`);
       // })
