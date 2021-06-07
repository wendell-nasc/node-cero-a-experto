const { inquirerMenu, pausa } = require ('./helpers/inqurier_aula51');
const Tarea = require('./models/tarea_aula51');

const Tareas = require('./models/tareas_aula51');

require ('colors');



console.clear();

const main = async () => {

    console.log('Ola mundo');

  
    let opt ='';

    do {

        //opt = await inquirerMenu();
        //console.log({opt});

        
        const tareas = new Tareas();
        const tarea = new Tarea('Comprar comida');
        
        //console.log(tarea);

        tareas._listado[tarea.id] = tarea;
        console.log(tareas);

        
        
        
       if ( opt !== '0') await pausa ();

    } while ( opt !== '0');



}


main();