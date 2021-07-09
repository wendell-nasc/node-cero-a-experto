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

//ObtenerCategoria - paginado - total - populate

const categoriasGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
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
    const { _id, ...resto } = req.body;

  
    const categoria = await Categoria.findByIdAndUpdate( id, resto );

    res.json(categoria);
}



const categoriasDelete = async(req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false } );

    
    res.json(categoria);
}

/*

const categoriasGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    });
}


const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    
    res.json(usuario);
}

*/


module.exports = {
    categoriasGet,
    categoriasPost,
    categoriasPut,
    //usuariosPatch,
    categoriasDelete
}