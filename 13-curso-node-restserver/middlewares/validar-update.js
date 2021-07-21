const { response } = require("express");

const validarArchivoSubir = (req, res = response, next ) => { 

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) { /// O criterio !req.files.archivo é referente ao nome do arquivo enviado pelo front end
        return res.status(400).json({ 
            msg: 'No hay archivo que subir en la peticion  - validarArchivoSubir'
        });
        
      }
  next();
}

module.exports = { 

    validarArchivoSubir
}