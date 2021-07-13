const { response, request } = require('express');


const {
    Usuario,
    Role,
    Categoria,
    Server
} = require('../models');





const categoriasPost = async(req, res = response) => {
    
    const nombre = req.body.nombre.toUpperCase(); ///colocar maiuscula
    
    
    const cateoriaDB = await Categoria.findOne({ nombre });

    if ( cateoriaDB) {
        return res.status(400).json({

        msg: `La categoria ${ cateoriaDB.nombre }, ya existe`
        });

    }

    const data = {
        nombre,
        usuario: req.usuario._id ///Informação do usuario ID vem do routes categorias a partir da função validar-jwt que busca o id do usuario assossiado ao token

    }
    
    const categoria = new Categoria( data );

  

    // Guardar en BD
    await categoria.save();

    res.status(201).json(
        categoria
    );
}

const obtenerCategoria = async(req, res = response) => {

    
        const { id } = req.params;
    
          
            // Verificar si el email existe
            const produto = await Categoria.findById( id )
                                    .populate('usuario', 'nombre')
                                    //.populate('categoria', 'nombre');
                     
    
            res.json( produto );
        
        }
    



//ObtenerCategoria - paginado - total - populate

const categoriasGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre') //Referencia para buscar os dados da chave estrangeira do usuario... id + nome
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);


  
    res.json({
        total,
        categorias
    });
}




const categoriasPut = async(req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ... data } = req.body; ///Extraí os campos que não devem ser alterados no banco

    
    data.nombre = data.nombre.toUpperCase(); // Coloca em maiusculo o nome da categoria
    data.usuario = req.usuario._id; /// Estabelece o usuario que fez a ultima modificação que vem do token JWT
    

    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true }); /// A função e, bigode { new: true } serve para mandar sempre um documento atualizado

    res.json(categoria);
}



const categoriasDelete = async(req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true }); /// A função e, bigode { new: true } serve para mandar sempre um documento atualizado

    
    res.json(categoria);
}




module.exports = {
    categoriasGet,
    categoriasPost,
    categoriasPut,
    //usuariosPatch,
    categoriasDelete,
    obtenerCategoria
}