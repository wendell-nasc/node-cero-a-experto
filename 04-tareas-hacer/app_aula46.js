require ('colors');

const {mostrarMenu,pausa} = require('./helpers/mensajes_aula46.js');


console.clear();

const main = async () => {

    console.log('Ola mundo');
    mostrarMenu();
    pausa();


}


main();