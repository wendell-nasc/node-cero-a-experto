const { option } = require('yargs');

const argv = require('yargs')
        .option('b',{
            alias: 'base',
            type: 'number',
            demandOption: true,
            describe: `La base de multiplicar`

        }        )



        .option('l',{
            alias: 'listar',
            type: 'boolean',
            demandOption: true,
            default: false,
            describe: `listar a tabla`
            }    
        )


            .option('h',{
                alias: 'hasta',
                type: 'number',
                default: 10,
                describe: `Este es el donde quieres la tabla`
            }                   

         )



        .check( (argv, options) => {
                    if (isNaN ( argv.b )){
                    throw 'La base tiene que ser  um numero'
                }
                return true;



            })

                .argv;
                
                module.exports = {
                    argv
                }