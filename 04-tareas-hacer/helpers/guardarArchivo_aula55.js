const fs = require('fs');




const archivo = './db/data.json'


////função para gravar o arquivo
const guardarDB = ( data ) => {
    
    /// o objeto JSON.stringify converte um objeto de ARRAY [] em string
    fs.writeFileSync( archivo, JSON.stringify(data));
    }



    ////função para ler o arquivo
const leerDB = () => {


    ///verifica se o arquivo existe
    if ( !fs.existsSync(archivo)) {
        return null;
    }
        ///colocar UTF para não voltar os bytes
    const info = fs.readFileSync(archivo, { encoding: 'utf-8'});
    
    ///Processo inverso do JSON.stringify, converte a STRING em ARRAY []
    const data = JSON.parse ( info ); 

//  console.log(info);
    console.log(data);

// retornar o array de tareas

    return data;
}   

module.exports = {
    guardarDB,
    leerDB


}