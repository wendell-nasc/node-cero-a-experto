


///configurar variaveis de entorno para ler as chaves ... o arquivo TXT foi alterado para .env  para ficar um path do caminho
require('dotenv').config()

const { 
    leerInput, inquirerMenu, pausa 
} = require ('./helpers/inqurier_aula75');

const Busquedas = require('./models/busquedas_aula75');


//console.log('Hola Mundo');





////Consultar variaveis de entorno ARGV
///console.log(process.argv);



////Consultar variaveis de entorno ENVIROLENT (VARIAVEIS DE ENTORNO  GLOBAIS)
///console.log(process.env);






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
    


//// Funcação principal para criar o menu da aplicação


main ();

