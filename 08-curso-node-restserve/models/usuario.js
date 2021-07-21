
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({



    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});



UsuarioSchema.methods.toJSON = function() {
    const { __v, _id, password, ... usuario  } = this.toObject(); //Remove o _id ... A função toObject retorna a coleção de dados do usuario buscado da base
    usuario.uid = _id; ///Cria uma nova variavel uid e dá o valor do _id, ou seja, muda o nome
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );
