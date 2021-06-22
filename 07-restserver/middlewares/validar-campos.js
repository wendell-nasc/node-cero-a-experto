const validarCampos = () => {

  ///Recebe os erros reportados do arquivo de routes
      
      const errors = validationResult( req ); 
      if( !errors.isEmpty() ) {
          return res.status(400).json( errors );

      }
  


}

module.exports = {

    validarCampos
}