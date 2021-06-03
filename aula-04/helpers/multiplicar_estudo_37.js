const fs = require('fs');    

const colors = require('colors');    

// const crearArchivo = ( base =5 ) => {
    const crearArchivo =  async( base =5 ) => {

        try {           


    return new Promise( (resolve, reject ) => {




console.log(`==================`.gree);
console.log(`tabla de `, colors.blue(base));
console.log(`==================`.green);

    let salida=``;


    for (let i = 1; i <= 10; i++) {
        salida+= `${ base } ${'x'.green } ${ i } ${'='.blue }  ${ base * i } \n`;
    }

    console.log(salida);
    
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
