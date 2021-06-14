


///configurar variaveis de entorno para ler as chaves ... o arquivo TXT foi alterado para .env  para ficar um path do caminho
require('dotenv').config()

const { 
    leerInput, inquirerMenu, pausa, listarLugares
} = require ('./helpers/inqurier_aula78');

const Busquedas = require('./models/busquedas_aula78');


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
                const termino = await leerInput('Ciudad: ');

                ///Buscar a cidades dos lugares na APIs
                const lugares = await busquedas.ciudad ( termino );

                 ///Buscar a clima dos lugares na APIs
                 //const clima = await busquedas.climaLugar ( lugares.lat, lugares.lng);

                ///Listar os lugares das API
                
               /// console.log( lugares );

                
                //// Para capturar o lugar selecionado e imprimir na sequencia
                const id = await listarLugares( lugares );
                console.log( { id });

                
            
                ///Metodo JAVA find para localizar a cidade pelo id e extrair informações
                const lugarSelecionado = lugares.find( l => l.id === id );




                ///Metodo JAVA find para localizar o clima da cidade pelo id e extrair informações
                //const climaSelecionado = clima.find( l => l.id === id );

                
                const clima1 = await busquedas.climaLugar ( lugarSelecionado.lat, lugarSelecionado.lng);


                //console.log( lugarSelecionado );

                console.log( clima1 );
                
                // Buscar los lugares

                // Seleccionar el lugar

                // clima

                // Mostrar resultados
                 
                console.log('\n Información de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSelecionado.nombre );
                console.log('Lat: ',lugarSelecionado.lat );
                console.log('Lng: ', lugarSelecionado.lng );
                console.log('Temperatura: ', clima1.temp);
                console.log('Mínima: ', clima1.min);
                console.log('Máxima: ', clima1.max);
                console.log('Como esta o clima: ', clima1.desc);
               

                break;
        }


       // if ( opt !== 0 )
        
        await pausa();


         

        } while ( opt !== '0');
    
    
    
    }
    


//// Funcação principal para criar o menu da aplicação


main ();

