const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId, ///Entidade Usuario mongo
        ref: 'Usuario',
        required: true
    }
    
    

});


module.exports = model( 'Categoria', CategoriaSchema );
