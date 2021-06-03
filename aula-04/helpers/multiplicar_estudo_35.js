const fs = require('fs');    

// const crearArchivo = ( base =5 ) => {
    const crearArchivo =  async( base =5, listar = false ) => {

        try {           

            let salida=``;

   // return new Promise( (resolve, reject ) => {

    for (let i = 1; i <= base; i++) {
        salida+= `${ base } * ${ i } = ${ base * i } \n`;
    }

    if (listar){
                

        console.log(`==================`);
        console.log(`tabla de ${ base }`);
        console.log(`==================`);
        console.log(salida);
      }

   
    
    fs.writeFileSync(`salida/tabla-${ base }.txt`, salida);


    
    return `tabla-${ base }.txt creado`;


//})


} catch (err) {

    throw err;

            
}
}


module.exports = {
    crearArchivo: crearArchivo

}
