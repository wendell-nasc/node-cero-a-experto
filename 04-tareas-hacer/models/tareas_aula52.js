const Tarea = require('./tarea_aula52');
/**
 * _listado
 * {uudi-123712-123-2; {id:12, desc:asd, completadoEn: 92231} },
 */

class Tareas{


    constructor () {
            this._listado = {};      
        }   
            
        crearTarea( desc = '') {

        const tarea = new Tarea( desc );
        
        this._listado[tarea.id] = tarea;
    } 



    }
    




module.exports = Tareas;
