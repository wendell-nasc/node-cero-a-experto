const { option } = require('yargs');
const { crearArchivo } = require('./helpers/multiplicar_estudo_35.js');  

const argv = require('yargs')
        .option('b',{
            alias: 'base',
            type: 'number',
            demandOption: true

        }        )



        .option('l',{
            alias: 'listar',
            type: 'boolean',
            demandOption: true,
            default: false

        }        )



        .check( (argv, options) => {
                    if (isNaN ( argv.b )){
                    throw 'La base tiene que ser  um numero'
                }
                return true;



            })

                .argv;
                

console.clear();


console.log( argv );

crearArchivo( argv.b,  argv.l )
.then( nombreArchivo => console.log(nombreArchivo, `creado`))
.catch( err => console.log(err) );


    
   // fs.writeFileSync(`tabla-${ base }.txt`, salida, (err) => {
        //if(err) throw err;
       // console.log(`tabla-${ base } creado`);
       // })
