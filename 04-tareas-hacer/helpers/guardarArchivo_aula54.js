const fs = require('fs');



const guardarDB = ( data ) => {

const archivo = './db/data.json'


/// o objeto JSON.stringify converte um objeto de ARRAY [] em string

fs.writeFileSync( archivo, JSON.stringify(data));

}

module.exports = {
    guardarDB


}