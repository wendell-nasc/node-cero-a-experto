const { crearArchivo } = require('./helpers/multiplicar.js');  

const base=77;

console.clear();

crearArchivo( base )
.then( nombreArchivo => console.log(nombreArchivo, `creado`))
.catch( err => console.log(err) );


    
    // fs.writeFileSync(`tabla-${ base }.txt`, salida, (err) => {
    //     if(err) throw err;
    //     console.log(`tabla-${ base } creado`);
    //     })
