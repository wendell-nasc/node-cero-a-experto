"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize"); ///Importa pacote para trabalhar com o banco MARIA DB
const db = new sequelize_1.Sequelize('cursonodeceroaoexperto', 'admin', 'duda123', {
    //host:'localhost',
    host: '127.0.0.1',
    //host:'localhost',
    //port: '3306', ///Precisa adicionar a porta para funcionar...se não colcar assume a padrçao 3306
    dialect: 'mariadb',
    //dialect: 'mysql',
    logging: true, ///Exibir todo comando SQL no console
});
exports.default = db;
//# sourceMappingURL=connection.js.map