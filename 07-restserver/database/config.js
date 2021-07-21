const mongoose = require('mongoose');

///Sera utilizado no server dos arquivs de Models

const dbConnection = async() => {

    try {
        
        await mongoose.connect( process.env.USERMONGODB_CNN, { 

        ///Funções de Mongoose
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        ///Se tudo ocorrer bem
        console.log('Base de datos online');
  

    } catch (error) { ///Se falhar dispara erro... usar sempre para conexao de banco
        console.log(error);
        throw new Error( `Error en la hora de iniciar la base de datos`);
        
    }


}

module.exports = {
    dbConnection

};