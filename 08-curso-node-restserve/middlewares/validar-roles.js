const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');



const esAdminRole = ( req, res = response, next ) => {


///Valida se tem token a peticion
if ( !req.usuario ) { 

    return res.status(500).json({

        msg: 'Se quiere verificar el role sin validar el token primero'
    });
}


const { rol, nombre } = req.usuario;

if ( rol !== 'ADMIN_ROLE'){

    return res.status(401).json({
        msg: `${ nombre } no es administrador - No puede hacer esto`
    });
    }

    next();       
    }

const tieneRole = ( ... roles ) => { /// pega as roles enviada pela rota e armazenada em roles
    return (req, res = response, next ) => {// Chama o express para usar o req.usuario na condição
       
       
        ///Valida se tem token a peticion
        if ( !req.usuario ) { 

            return res.status(500).json({

                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }
      
       if ( !roles.includes ( req.usuario.rol ) ) { //A funçõa roles.includes verifica se a role usuario é igual as da fiunção enviada pelo middlware 
           return res.status(401).json({

            msg: `El servicio requiere uno de estos roles ${ roles }`

           })



       }
        // console.log(roles, req.usuario.rol);

    next();
    }


}


module.exports ={

    esAdminRole,tieneRole
}