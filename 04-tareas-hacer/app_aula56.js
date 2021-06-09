require ('colors');



const { inquirerMenu, 
    pausa,
    leerInput 
} = require ('./helpers/inqurier_aula53');

const Tareas = require('./models/tareas_aula56');

const {guardarDB,
    leerDB
    } = require('./helpers/guardarArchivo_aula56');







console.clear();

const main = async () => {

    console.log('Ola mundo');

  
    let opt ='';

    /// Estancia o objeto para armazenar as tareas
    const tareas = new Tareas();

   /// Estancia o objeto para lear as tareas no arquivo json
    const tareasDB = leerDB();

    if ( tareasDB) {    /// cargar tareas

            
            tareas.cargarTareasFromArray ( tareasDB );

    }

    // await pausa ();


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

/// Estancia o objeto para guardar as tareas no arquivo json
guardarDB( tareas.listadoArr )


        
        
        
       //if ( opt !== '0') await pausa ();

       await pausa ();

    } while ( opt !== '0');



}


main();