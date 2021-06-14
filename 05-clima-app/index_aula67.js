
const { 
    leerInput 
} = require ('./helpers/inqurier_aula67');

console.log('Hola Mundo');


const main = async () => { 

    const texto = await leerInput('Hola: ')
    console.log ( texto );

}

main ();

