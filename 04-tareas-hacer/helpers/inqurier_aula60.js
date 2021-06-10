require('colors');

const inquirer = require('inquirer');


const preguntas = [
    {
type: 'list',
name: 'opcion',
message: 'Que desea hacer?',
choices: [
    
    {
        value: '1',
        name: `${ ' 1.'.green }Crear tarea`       
    },

    {
        value: '2',
        name: `${ ' 2.'.green }Listar tareas`    
    },

    {
        value: '3',
        name: `${ ' 3.'.green }Listar tareas completadas`
    },

    {
        value: '4',
        name: `${ ' 4.'.green }Listar tareas pendientes`
    },
    {
        value: '5',
        name: `${ ' 5.'.green }Completar tarea(s)`        
    },
    {
        value: '6',
        name: `${ ' 6.'.green }Borrar tarea`       
    },
    {
        value: '0',
        name: `${ '0.'.green }Salir`
     },
]
    }
];



const inquirerMenu = async () => {

        console.clear();

        console.log('========================'.green);
        console.log('Seleccione una opción'.white);
        console.log('======================== \n'.green);
    
  
        
        const { opcion } = await inquirer.prompt (preguntas);

      
    

        return opcion;


}

const pausa = async() => {

          const question = [
            {
        type: 'input',
        name: 'enter',
        message: `\n Presione enter:  ${ 'ENTER'.green } para continuar \n`       
        
            }
        ]
        console.log('\n');
        


            const { opcion } = await inquirer.prompt (question);

        }


        const leerInput = async( message ) => {

            const question = [
            { 
            type: 'input',
            name: 'desc',
            message,

            validate ( value ) {
                if( value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
                 }        
                  
                }
            ];
            
            const { desc } = await inquirer.prompt(question);
            return desc;
            }
        

           

            ///Funcao para exibir as mensagens do metodo excluir

            const listadoTareasBorrar = async (tareas = [] )=> {

                const choices = tareas.map( (tarea,i)  => {

                    const idx = `${i + 1}.`.green;

                    return { 
                        value: tarea.id,
                        name: ` ${ idx } ${ tarea.desc } `
                    }
                });

                        ////Opção 0(zero) para do menu borrar para não fazer nada

                        ///unshift é para posicionar no inicio do array

                        choices.unshift({
                            value: '0',
                            name: '0.'.green + 'Cancelar'

                        })


                    // continuação das funcionalidade do metodo borrar / perguntas
                const preguntas = [
                    {
                        type: 'list',
                        name: 'id',
                        message: 'Borrar',
                        choices
                    }
                ]

                const { id } = await inquirer.prompt(preguntas);
                return id;

               // console.log(choices)

        } 

//// Mensagem de confirmaçao de exclusão da funão borrar

        const confirmar = async (message) => {
            
            ////Consultar a documentação do INQURIER no node JS para verificar os metodos de perguntas de console


        const question = [ 
            {
                type: 'confirm',
                name: 'ok',
                message

            }
            ];
        const { ok } = await inquirer.prompt ( question );
        return ok;        

        }

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar

    
}