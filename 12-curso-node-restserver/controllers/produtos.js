const { response, request } = require('express');


const {
    
    Produto
    
} = require('../models');





const produtosPost = async(req, res = response) => {

    const { estado, usuario, ...body }= req.body
    
  
     const produtoDB = await Produto.findOne({ nombre: body.nombre });

    
      if ( produtoDB) {
        return res.status(400).json({

        msg: `La produto ${ produtoDB.nombre }, ya existe`
        });

    }

    const data = {

        
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
        ...body // Manta todo o restante
         ///Informação do usuario ID vem do routes produtos a partir da função validar-jwt que busca o id do usuario assossiado ao token

    };

    console.log(data);

    const produto = new Produto( data );

  

    // Guardar en BD
    await produto.save();

    res.status(201).json(
        produto
    );
}

const obtenerProdutos = async(req, res = response) => {

    const { id } = req.params;

      
        // Verificar si el email existe
        const produto = await Produto.findById( id )
                                .populate('usuario', 'nombre')
                                //.populate('categoria', 'nombre');
                 

        res.json( produto );
    
    }



//Obtenerproduto - paginado - total - populate

const produtosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, produtos ] = await Promise.all([
        Produto.countDocuments(query),
        Produto.find(query)
            .populate('usuario', 'nombre') //Referencia para buscar os dados da chave estrangeira do usuario... id + nome
          //  .populate('categoria', 'nombre') //Referencia para buscar os dados da chave estrangeira do usuario... id + nome
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);


  
    res.json({
        total,
        produtos
    });
}




const produtosPut = async(req, res = response) => {

    const { id } = req.params;

    const { estado, usuario, ...data }= req.body; ///Extraí os campos que não devem ser alterados no banco

    if (data.nombre ){
        data.nombre = data.nombre.toUpperCase(); /// se for enviado o nome para atualizar é colocado em maiusculo
    }
    
    data.usuario = req.usuario._id; /// Estabelece o usuario que fez a ultima modificação que vem do token JWT
   

    const produto = await Produto.findByIdAndUpdate( id, data, { new: true }); /// A função e, bigode { new: true } serve para mandar sempre um documento atualizado

    res.json(produto);
}



const produtosDelete = async(req, res = response) => {

    const { id } = req.params;
    const produto = await Produto.findByIdAndUpdate( id, { estado: false }, { new: true }); /// A função e, bigode { new: true } serve para mandar sempre um documento atualizado

    
    res.json(produto);
}




module.exports = {
    produtosGet,
    produtosPost,
    produtosPut,
    //usuariosPatch,
    produtosDelete,
    obtenerProdutos
}