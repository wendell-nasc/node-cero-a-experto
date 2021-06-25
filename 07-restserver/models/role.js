const { Schema, model } = require('mongoose'); ///Extrai esquema e modelo

const RoleSchema = Schema({

role: { ///Campo da tabela que será consultado/validado
    type: String,
    required: [ true, 'El role es obligatorio']
}

});

module.exports = model('Role', RoleSchema);