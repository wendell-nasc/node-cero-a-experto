const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Produto } = require('../models');



const collecionesPermitidas = [
    'usuarios',
    'categorias',
    'produtos',
    'roles'
];


const buscarUsuarios = async (termino = '', res = response ) => {
    const esMongoID = ObjectId.isValid ( termino ); //Retorna true ou false se é ID MONGO

    if ( esMongoID ){
        const usuario = await Usuario.findById(termino);
        
        ///res.json(usuario); ///Pode retornar rodos os valores ou semente o resultado (vide abaixo)
      return  res.json({

            results: (usuario ) ? [ usuario ] : []
        });

    }

    const regex = new RegExp ( termino, 'i' ); /// Top ! Fazer consulta ppor indice com expressoes regulaçoes sem diferenciaçãoi de maiusculas e minusculas

    const usuarios1 = await Usuario.count({//A propriedade count serve para contar a quantidade de registros
        $or: [{ nombre: regex}, { correo: regex }],/// Proprieda mongoose $or serve para colocar mais condicoes para comparar mais campos
        $and: [{ estado: true }]
    });

    const usuarios = await Usuario.find({//({ nombre: regex });/// Buscar entidade Usuario por nome
        $or: [{ nombre: regex}, { correo: regex }],/// Proprieda mongoose $or serve para colocar mais condicoes para comparar mais campos
        $and: [{ estado: true }]
    });

    



    res.json({
        results: usuarios, usuarios1
    });


}


const buscarCategorias = async (termino = '', res = response ) => {
    const esMongoID = ObjectId.isValid ( termino ); //Retorna true ou false se é ID MONGO

    if ( esMongoID ){
        const categoria = await Categoria.findById(termino)                            
                            .populate('usuario', 'nombre');
        
        ///res.json(categoria); ///Pode retornar rodos os valores ou semente o resultado (vide abaixo)
      return  res.json({

            results: (categoria ) ? [ categoria ] : []
        });

    }

    const regex = new RegExp ( termino, 'i' ); /// Top ! Fazer consulta ppor indice com expressoes regulaçoes sem diferenciaçãoi de maiusculas e minusculas

    const categorias1 = await Categoria.count({//A propriedade count serve para contar a quantidade de registros
        $or: [{ nombre: regex} ],/// Proprieda mongoose $or serve para colocar mais condicoes para comparar mais campos
        $and: [{ estado: true }]
    });

    const categorias = await Categoria.find({ nombre: regex, estado: true })                            
                            .populate('usuario', 'nombre');

    res.json({
        results: categorias, categorias1
    });


}

    const buscarProdutos = async (termino = '', res = response ) => {
        const esMongoID = ObjectId.isValid ( termino ); //Retorna true ou false se é ID MONGO
    
        if ( esMongoID ){
            const produto = await Produto.findById(termino)
                    .populate('categoria','nombre')
                    .populate('usuario', 'nombre');

                    
            ///res.json(usuario); ///Pode retornar rodos os valores ou semente o resultado (vide abaixo)
          return  res.json({
    
                results: (produto ) ? [ produto ] : []
            });
    
        }
    
        const regex = new RegExp ( termino, 'i' ); /// Top ! Fazer consulta ppor indice com expressoes regulaçoes sem diferenciaçãoi de maiusculas e minusculas
    
        const produtos1 = await Produto.count({//A propriedade count serve para contar a quantidade de registros
            $or: [{ nombre: regex}, { description: regex }],/// Proprieda mongoose $or serve para colocar mais condicoes para comparar mais campos
            $and: [{ estado: true }]
        });
    
        const produtos = await Produto.find({//({ nombre: regex });/// Buscar entidade Usuario por nome
            $or: [{ nombre: regex}, { description: regex }],/// Proprieda mongoose $or serve para colocar mais condicoes para comparar mais campos
            $and: [{ estado: true }]
        })
                                .populate('categoria','nombre')
                                .populate('usuario', 'nombre');
    
        
    
    
    
        res.json({
            results: produtos, produtos1
        });
    
    
    }



   

const buscar = ( req, res = response) => {

   const { coleccion, termino } = req.params; /// coleccion e termino vem do arquivo rota buscar.js

   if ( !collecionesPermitidas.includes ( coleccion )){
       return res.status(400).json({

        msg: `Las colecciones permitidas son: ${collecionesPermitidas} `
       })

   }

   switch ( coleccion ){

    case 'usuarios':
        buscarUsuarios(termino, res);    
    break;

    

    case'categorias':
        buscarCategorias(termino, res);       
    break;
    
    case'produtos':
        buscarProdutos(termino, res);     
    break;

  
    default:
        res.status(500).json({
            msg: 'Se le olvido hacer esta busqueda'
        })

   }


    /*
        res.json({
        //msg: 'Buscar...'
        coleccion, termino

        })
    */

}

module.exports = {

    buscar
}