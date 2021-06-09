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
            

        
        crearTarea( desc = '') {

        const tarea = new Tarea( desc );
        
        this._listado[tarea.id] = tarea;
    } 



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

    }
    




module.exports = Tareas;
