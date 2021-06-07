require ('colors');

const mostrarMenu = () => {

    console.clear();

    console.log('========================'.green);
    console.log('Seleccione una opción'.green);
    console.log('======================== \n'.green);

    console.log(`${ '2.'.green } Listar tareas`);
    console.log(`${ '1.'.green } Crear tarea`);
    console.log(`${ '3.'.green } Listar tareas completadas`);
    console.log(`${ '4.'.green } Completar tareas`);
    console.log(`${ '5.'.green } Completar tarea`);
    console.log(`${ '6.'.green } Borrar tarea`);
    console.log(`${ '0.'.green } Salir`);

    const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
    });

    readline.question('Seleccione una opción: ', (opt) => {
        readline.close();

    })

}
    const pausa = () => {
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\n Presione enter:  ${ 'ENTER'.green } para continuar \n`, (opt) => {
            readline.close();
        })

    }




module.exports = {
    mostrarMenu,
    pausa
    
}