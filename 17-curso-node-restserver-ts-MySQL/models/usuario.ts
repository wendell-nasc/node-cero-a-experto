import { DataType, DataTypes } from 'sequelize'; ///Importar forma de dados MARIADB para definir modelos schemas
import db from '../db/connection';



const Usuario = db.define('usuarios', {  //Nome da tabela da base de dados conectadas

        nombre: {
            type: DataTypes.STRING                

        },
        
        email: {
            type: DataTypes.STRING                

        },
   
        estado: {
            //type: DataTypes.TINYINT                
            type: DataTypes.BOOLEAN // A base foi definido como TINYINT, porém pode ser manuseado com BOOLEAN

        },

});


export default Usuario; ///Exporta o modelo


