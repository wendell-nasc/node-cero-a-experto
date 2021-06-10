const Tarea = require('./tarea_aula53');
/**
 * _listado
 * {uudi-123712-123-2; {id:12, desc:asd, completadoEn: 92231} },
 */

class Tareas {

    //_listado = {};

    get listadoArr() { 

        const listado = [];
        Object.keys(this._listado).forEach ( key => {
            const tarea = this._listado[key];
            listado.push (tarea )
        });
            
        return listado;


    }




    constructor () {
            this._listado = {};      
        }   
            
            //
            cargarTareasFromArray ( tareas = []){
                tareas.forEach ( tarea => {
                    this._listado[tarea.id] = tarea;
                });                              
            }
            
// Borrar tareas 

        borrarTarea( id = '' ) {

        if ( this._listado[id] ){

            delete this._listado[id];


        }


        }




        crearTarea( desc = '') {

        const tarea = new Tarea( desc );
        
        this._listado[tarea.id] = tarea;
    } 

/*
 * MENU 2 - LISTAR TAREAS
 */
            //console.log (this._listado);
            //console.log (this._listadoArr);
                
           // 1: en verde
           // Completada: verdde
           // Pendiente: rojo

           //1. tarea1 :: Completada | Pediente 
           //1. tarea2 :: Completada | Pediente 
           //1. tarea3 :: Completada | Pediente 

           listadoCompleto () {

        //console.log(this._listado);
        //console.log(this.listadoArr);

        console.log();
        this.listadoArr.forEach ( ( tarea, i) => {
            const idx = `${ i + 1 }`.green;
            const { id, desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                ? 'Completada'.green
                : 'Pediente'.red;

            console.log( `${ idx } :: ${ desc } :: ${ id } :: ${ estado }` );


        } );

            
        };



/*
 * MENU 3 - LISTAR TAREAS COMPLETADAS
 */

/* Exercicio reailzado 
listarPendientesCompletadas ( completadas = true) {

    console.log();

    this.listadoArr.forEach ( ( tarea, i) => {
        const idx = `${ i + 1 }`.green;
        const { id, desc, completadoEn } = tarea;
        const estado = ( completadas )
           // ? 'Completada'.green;

            if ( completadoEn != null ) {
                console.log( `${ idx } :: ${ desc } :: ${ id } :: ${ estado } ${'Completada'.green }` );
                //return (`El valor introducido ${ base } no es un número`);
            }
            

       // console.log( `${ idx } :: ${ desc } :: ${ id } :: ${ estado }` );


    } );

        
    };

     */

    listarPendientesCompletadas ( completadas = true) {

        console.log();
        let contador = 0;
        this.listadoArr.forEach ( ( tarea ) => {
            
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                ? 'Completada'.green
                : 'Pediente'.red;
            
                if ( completadas ){
                    /// Mostrar completadas

                    if ( completadoEn) { 
                        contador += 1;
                        console.log( `${ (contador + `.`).green } ${ desc } :: ${ completadoEn.green }`);
                    }

                    } else {

                        /// mostrar pedientes 
                        if ( ! completadoEn ) {
                            contador+=1;
                            console.log( `${ (contador + `.`).green } ${ desc } :: ${ estado }`);
                        }

                    }

                    


        } );

            
        }


/*
 * MENU 5 - COMPLETAR TAREAS
 */

        toogleCompletadas ( ids = [] ) {


            ids.forEach ( id => {
                
                const tarea = this._listado[id];
                if ( !tarea.completadoEn ) {

                    tarea.completadoEn = new Date().toISOString()
                    
                }
            

            });
        this.listadoArr.forEach ( tarea => {
                if ( !ids.includes ( tarea.id )){
                this._listado[tarea.id].completadoEn = null;
                

        }


        })

    }

}

module.exports = Tareas;
