const fs = require('fs');    
    
const base=43;

    console.clear();
    console.log(`==================`);
    console.log(`tabla de ${ base }`);
    console.log(`==================`);

    
    let salida=``;


    for (let i = 1; i <= base; i++) {
        salida+= `${ base } * ${ i } = ${ base * i } \n`;
    }

    console.log(salida);
    
    fs.writeFile(`tabla-${ base }.txt`, salida, (err) => {
        if(err) throw err;
        console.log(`tabla-${ base } creado`);
        })
