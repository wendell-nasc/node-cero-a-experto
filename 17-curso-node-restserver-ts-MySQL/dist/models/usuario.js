"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize"); ///Importar forma de dados MARIADB para definir modelos schemas
const connection_1 = __importDefault(require("../db/connection"));
const Usuario = connection_1.default.define('usuarios', {
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        //type: DataTypes.TINYINT                
        type: sequelize_1.DataTypes.BOOLEAN // A base foi definido como TINYINT, porém pode ser manuseado com BOOLEAN
    },
});
exports.default = Usuario; ///Exporta o modelo
//# sourceMappingURL=usuario.js.map