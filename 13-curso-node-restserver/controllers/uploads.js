
const { response } = require("express");
const { subirArchivo } = require("../helpers");

const cargaArchivo = async (req, res = response) => {

    console.log(req.files); /// sUPER IMPORTANTE ... USADA PARA VERIFICAR O LOG COM A IDENTIFICACAO DOS RQUIVOS ENVIADOS

    ///codigo copiado do exemplo da biblioteca
    //https://github.com/wendell-nasc/express-fileupload/blob/master/example/server.js

    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) { /// O criterio !req.files.archivo é referente ao nome do arquivo enviado pelo front end
      res.status(400).json({ msg: 'No hay archivo que subir en la peticion '} );
      return;
    }





try {

  
    /// Imagens
    
  //const pathCompleto = await subirArchivo( req.files )/// Chama a função subirArchivo de helpers
  // Definir as exteciones validas txt ou md exemplo

  //const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos')/// Chama a função subirArchivo de helpers

  const nombre = await subirArchivo( req.files, undefined, 'imgs')/// Chama a função subirArchivo de helpers


  res.json({
  ///path: pathCompleto // Retorna o nome do arquivo
  nombre  
  });

} catch (msg) {
  
  res.status(400).json( { msg });
}

   
}

const actualizarImagen = async (req, res = response ) => { 

const { id, coleccion } = req.params;

res.json({ id, coleccion  })



}


module.exports = {

    cargaArchivo,
    actualizarImagen
}