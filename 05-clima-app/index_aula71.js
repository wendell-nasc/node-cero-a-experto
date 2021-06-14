const { 
    leerInput, inquirerMenu, pausa 
} = require ('./helpers/inqurier_aula71');



const Busquedas = require('./models/busquedas_aula71');

//console.log('Hola Mundo');


const main = async () => { 
/// AULA 1 ///
    // const texto = await leerInput('Hola: ')
   // console.log ( texto );


    // Método para buscar as cidades 

    const busquedas = new Busquedas();


    let opt ='';

    

   


    do {

        //Imprime menu
        
        opt = await inquirerMenu();

       // console.log ( {opt} );

        switch ( opt ) {
            case 1:

                // Mostrar mensaje

                //const lugar = await leerInput( 'Ciudad: ');
                 //crear opcion
                const lugar = await leerInput('Ciudad: ');


               await busquedas.ciudad ( lugar );

                // Buscar los lugares

                // Seleccionar el lugar

                // clima

                // Mostrar resultados

                console.log('\n Información de la ciudad\n'.green);
                console.log('Ciudad: ', );
                console.log('Lat: ', );
                console.log('Lng: ', );
                console.log('Temperatura: ', );
                console.log('Mínima: ', );
                console.log('Máxima: ', );

                break;
        }


       // if ( opt !== 0 )
        
        await pausa();


         

        } while ( opt !== '0');
    
    
    
    }
    

       /*

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

        
    
}

        /// Estancia o objeto para guardar as tareas no arquivo json
        guardarDB( tareas.listadoArr )


        
        
        
       //if ( opt !== '0') await pausa ();

       
       */
      
   



main ();

