const { argv } = require('./config/yargs_estudo_36.js');  


const {crearArchivo}  = require('./helpers/multiplicar_estudo_35.js');  


console.clear();


console.log( argv );

crearArchivo( argv.b,  argv.l )
.then( nombreArchivo => console.log(nombreArchivo, `creado`))
.catch( err => console.log(err) );


    
   // fs.writeFileSync(`tabla-${ base }.txt`, salida, (err) => {
        //if(err) throw err;
       // console.log(`tabla-${ base } creado`);
       // })
