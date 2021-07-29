import { Sequelize } from 'sequelize'; ///Importa pacote para trabalhar com o banco MARIA DB


const db = new Sequelize('cursonodeceroaoexperto', 'admin', 'duda123', { //Define a base de dados
    //host:'localhost',
    host:'127.0.0.1', //definido o IP do servidor
    //host:'localhost',
    //port: '3306', ///Precisa adicionar a porta para funcionar...se não colcar assume a padrçao 3306
    dialect: 'mariadb',
    //dialect: 'mysql',
    logging: true, ///Exibir todo comando SQL no console

});

export default db; 
