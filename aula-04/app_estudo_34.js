const { crearArchivo } = require('./helpers/multiplicar.js');  

const argv = require('yargs')
                .argv;
                

console.clear();


//const base=77;
console.log( process.argv );
console.log( argv );

console.log( 'Base: yargs', argv.base );



//crearArchivo( base )
//.then( nombreArchivo => console.log(nombreArchivo, `creado`))
//.catch( err => console.log(err) );


    
    // fs.writeFileSync(`tabla-${ base }.txt`, salida, (err) => {
    //     if(err) throw err;
    //     console.log(`tabla-${ base } creado`);
    //     })
