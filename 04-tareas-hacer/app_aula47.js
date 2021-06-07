require ('colors');

const {mostrarMenu,pausa} = require('./helpers/mensajes_aula47.js');


console.clear();

const main = async () => {

    console.log('Ola mundo');

    let opt ='';

    do {

        opt = await mostrarMenu();
        console.log({opt});
        
        if ( opt !== '0') await pausa ();

    } while ( opt !== '0');




    //mostrarMenu();
    //pausa();


}


main();