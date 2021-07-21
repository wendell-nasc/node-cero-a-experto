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
//Criar metodos para sobreescrever as funcoes existe , como o password
UsuarioSchema.methods.toJSON = function() {

    //Desestruturar o objeto Usuario
const { __v, password, ... usuario } = this.toObject (); ///remove os valores/campos __v e password
return usuario;



}

module.exports = model ( 'Usuarios', UsuarioSchema );