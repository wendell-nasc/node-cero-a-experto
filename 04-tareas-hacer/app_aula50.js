require ('colors');

const { inquirerMenu, pausa } = require ('./helpers/inqurier_aula50')


console.clear();

const main = async () => {

    console.log('Ola mundo');

    let opt ='';

    do {

        opt = await inquirerMenu();
        console.log({opt});
        
        if ( opt !== '0') await pausa ();

    } while ( opt !== '0');



}


main();