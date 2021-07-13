const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true, ///grava true se não for passado nada
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId, ////Usado para vincular as entidades que psosuem chave estrangeira
        ref: 'Usuario',
        required: true
    }
    
    





});

CategoriaSchema.methods.toJSON = function() {
    const { __v, estado,...data  } = this.toObject(); // Remove do objeto a versao e estado
   
    return data;
    //return categoria;
}


module.exports = model( 'Categoria', CategoriaSchema );
