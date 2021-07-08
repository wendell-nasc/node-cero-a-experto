const { response } = require('express')

const Categoria = require('../models/categoria');

const tieneCategoria = async(req, res = response) => {

    const { id } = req.body;

    try {
      
        // Verificar si el email existe
        const categoria = await Categoria.findOne({ id });
        if ( !categoria ) {
            return res.status(400).json({
                msg: 'Categoria son correctos - id'
            });
        }

        // SI el usuario está activo
        if ( !categoria.estado ) {
            return res.status(400).json({
                msg: 'Categoria / Password no son correctos - estado: false'
            });
        }

      

        res.json({
            categoria
            
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}


/*
const esAdminRole = ( req, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;
    
    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }

    next();
}


const tieneRole = ( ...roles  ) => {
    return (req, res = response, next) => {
        
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }


        next();
    }
}
*/


module.exports = {
    //esAdminRole,
    tieneCategoria
}