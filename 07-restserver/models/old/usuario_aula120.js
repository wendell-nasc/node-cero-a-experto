const { Schema, model }= require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio']
        },


    correo: {
        type: String,
        required: [ true, 'El correo es obligatorio'],
        unique: true
        },

   
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatorio']
        },

    img:    {
            type: String
            },
           
    
    role: {
            type: String,
            required: true,
            emun: [ 'ADMIN_ROLE', 'USER_ROLE']
            },
    
    estado: {
        type: Boolean,
        default: true
    },

    
    google: {
        type: Boolean,
        default: false
    }   


});

/* 

Mongoose colocara por default o nome da conexão no plural ,por isso precisa por assim
Modelos que serão criados:

Usuarios
Produtos

*/

module.exports = model ( 'Usuarios', UsuarioSchema );