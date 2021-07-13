const { Schema, model } = require('mongoose');

const ProdutoSchema = Schema({
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
        type: Schema.Types.ObjectId, ///Usado para vincular as entidades que psosuem chave estrangeira
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0

    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    description: {
        type: String,

    },
    disponible:
    {
        type: Boolean,
        default: true
    }

});

ProdutoSchema.methods.toJSON = function() {
    const { __v, estado,...data  } = this.toObject(); // Remove do objeto a versao e estado
   
    return data;
}


module.exports = model( 'Produto', ProdutoSchema );
