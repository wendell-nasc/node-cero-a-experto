const fs = require('fs');    

const colors = require('colors');    

// const crearArchivo = ( base =5 ) => {
    const crearArchivo =  async( base =5, listar=false, hasta = 10 ) => {

        try {           


    return new Promise( (resolve, reject ) => {




console.log(`==================`.gree);
console.log(`tabla de `, colors.blue(base));
console.log(`==================`.green);

    let salida, consola=``;


    for (let i = 1; i <= hasta; i++) {
        salida+= `${ base } x ${ i } = ${ base * i } \n`;
        consola+= `${ base } ${'x'.green } ${ i } ${'='.blue }  ${ base * i } \n`;
    }

    console.log(consola);
    
    fs.writeFileSync(`salida/tabla-${ base }.txt`, salida);


    //        console.log(`tabla-${ base } creado`); 

    // resolve( `tabla-${ base }.txt creado`)
    return `tabla-${ base }.txt creado`;
 })


} catch (err) {

    throw err;

            
}


}

module.exports = {
    crearArchivo: crearArchivo

}
