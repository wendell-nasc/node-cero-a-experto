const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => { //next é o terceiro argumento para seguir se não cair no erro 

  ///Recebe os erros reportados do arquivo de routes
      
      const errors = validationResult( req ); 
      if( !errors.isEmpty() ) {
          return res.status(400).json( errors );

      }
  
      next();

}

module.exports = {

    validarCampos
}