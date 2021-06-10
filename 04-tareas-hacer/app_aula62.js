require ('colors');



const { inquirerMenu, 
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
    
    } = require ('./helpers/inqurier_aula62');

const Tareas = require('./models/tareas_aula62');

const {guardarDB,
    leerDB
    } = require('./helpers/guardarArchivo_aula57');
const { fetchAsyncQuestionPropertyQuestionProperty } = require('inquirer/lib/utils/utils');







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
            tareas.listadoCompleto();
            
        break;

        case '3': // Listar as completadas
            //crear opcion
            tareas.listarPendientesCompletadas( true );
            

        break;

        case '4': // Listar as pendientes
            //crear opcion
            tareas.listarPendientesCompletadas( false );
            
        break;


        case '5': // completado | pendiente
            //crear opcion
            
  
        const ids = await mostrarListadoChecklist( tareas.listadoArr );
        ///console.log (ids);

        tareas.toogleCompletadas ( ids );

        
    break;
            

        case '6': // Borrar tarea
            
            const id = await listadoTareasBorrar ( tareas.listadoArr );

            ///Valor 0(zero) caso o cliente deseje cancelar
            if ( id !== '0'){

         
            const confirmarborrar = await confirmar('Está seguro que deseja borrar?');
            // TUDO: preguntar si está seguro pra borrar
            //console.log ( { confirmarborrar })
            if ( confirmarborrar ){
                tareas.borrarTarea( id );
                console.log('Tarea borrada com su cesso ');
                }

            }
                         
        break;
    
}

/// Estancia o objeto para guardar as tareas no arquivo json
guardarDB( tareas.listadoArr )


        
        
        
       //if ( opt !== '0') await pausa ();

       await pausa ();

    } while ( opt !== '0');



}


main();