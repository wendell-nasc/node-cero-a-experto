require ('colors');



const { inquirerMenu, 
    pausa,
    leerInput 
} = require ('./helpers/inqurier_aula53');

const Tareas = require('./models/tareas_aula53');

const {guardarDB} = require('./helpers/guardarArchivo_aula54');






console.clear();

const main = async () => {

    console.log('Ola mundo');

  
    let opt ='';
    const tareas = new Tareas();




    do {

        //Imprime menu
        
        opt = await inquirerMenu();

        console.log({opt});

        
        switch (opt) {
    case '1':
            //crear opcion
            const desc = await leerInput('Descripción: ');
            //console.log ( desc );
            tareas.crearTarea( desc )

        break;
    case '2':
            //crear opcion
            console.log( tareas.listadoArr );
            
        break;

    
}

guardarDB( tareas.listadoArr )


        
        
        
       if ( opt !== '0') await pausa ();

    } while ( opt !== '0');



}


main();