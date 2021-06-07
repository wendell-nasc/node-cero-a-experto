const fs = require('fs');    

// const crearArchivo = ( base =5 ) => {
    const crearArchivo =  async( base =5 ) => {

        try {
            


    return new Promise( (resolve, reject ) => {




console.log(`==================`);
console.log(`tabla de ${ base }`);
console.log(`==================`);

    let salida=``;


    for (let i = 1; i <= base; i++) {
        salida+= `${ base } * ${ i } = ${ base * i } \n`;
    }

    console.log(salida);
    
    fs.writeFileSync(`tabla-${ base }.txt`, salida);


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
