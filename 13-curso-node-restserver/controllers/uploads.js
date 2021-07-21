const path = require( 'path');
const fs = require( 'fs');

var cloudinary = require('cloudinary').v2
cloudinary.config ( process.env.CLOUDINARY_URL ); ///configurado a conexao com Cloudinary

const { response } = require("express");
const { subirArchivo } = require("../helpers");

const { Usuario, Producto } = require('../models');
//const usuario = require("../models/usuario");

const cargaArchivo = async (req, res = response) => {

    console.log(req.files); /// sUPER IMPORTANTE ... USADA PARA VERIFICAR O LOG COM A IDENTIFICACAO DOS RQUIVOS ENVIADOS

    ///codigo copiado do exemplo da biblioteca
    //https://github.com/wendell-nasc/express-fileupload/blob/master/example/server.js

    /* Criado o midleware  validarArchivoSubir para fazer a validacao abaixo
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) { /// O criterio !req.files.archivo é referente ao nome do arquivo enviado pelo front end
      res.status(400).json({ msg: 'No hay archivo que subir en la peticion '} );
      return;
    }
    */





try {

  
    /// Imagens
    
  //const pathCompleto = await subirArchivo( req.files )/// Chama a função subirArchivo de helpers
  // Definir as exteciones validas txt ou md exemplo

  //const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos')/// Chama a função subirArchivo de helpers

  const nombre = await subirArchivo( req.files, undefined, 'imgss')/// Chama a função subirArchivo de helpers


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

/* Criado o midleware  validarArchivoSubir para fazer a validacao abaixo

if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) { /// O criterio !req.files.archivo é referente ao nome do arquivo enviado pelo front end
  res.status(400).json({ msg: 'No hay archivo que subir en la peticion '} );
  return;
}

*/


console.log( { coleccion}  ); 

let modelo;

switch ( coleccion ) {
  case 'usuarios':
     modelo = await Usuario.findById(id);
     //console.log(modelo);

     if ( !modelo ){
      return res.status(400).json({
        msg: `No existe un usuario com el id ${ id }`
      });

     }
    break;

    case 'productos':
     modelo = await Producto.findById(id);
     if ( !modelo ){
      return res.status(400).json({
        msg: `No existe un produto com el idddd ${ id }`
      });

     }
    break;
    
    default:    
       res.status(500).json( { msg: 'Se me olvido valida esto ' } );
    }

///Limpiar imagenes previas / deixa apenas uma imagem ... verifica no banco a referencia do ultimo arquivo, exclui e substitui pela nova
//teste
//console.log( modelo )
if ( modelo.img ){
  //Hay que borrar la imagen del servidor
  const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
  if ( fs.existsSync ( pathImagen) ) { 
    fs.unlinkSync ( pathImagen);

  }
}

const nombre1 = await subirArchivo( req.files, undefined,  coleccion  ) /// Chama a função subirArchivo de helpers
modelo.img = nombre1;
await modelo.save();

res.json ( modelo );
//res.json ( { id, coleccion } );
}


const actualizarImagenCloudinary = async (req, res = response ) => { ///copiado da função actualizarImagen

  const { id, coleccion } = req.params;
  

  let modelo;
  
  switch ( coleccion ) {
    case 'usuarios':
       modelo = await Usuario.findById(id);
       //console.log(modelo);
  
       if ( !modelo ){
        return res.status(400).json({
          msg: `No existe un usuario com el id ${ id }`
        });
  
       }
      break;
  
      case 'productos':
       modelo = await Producto.findById(id);
       if ( !modelo ){
        return res.status(400).json({
          msg: `No existe un produto com el idddd ${ id }`
        });
  
       }
      break;
      
      default:    
         res.status(500).json( { msg: 'Se me olvido valida esto ' } );
      }
  
  ///Limpiar imagenes previas do Cloudinary/ deixa apenas uma imagem ... verifica no banco a referencia do ultimo arquivo, exclui e substitui pela nova

  if ( modelo.img ){
    // Função javascript split separa a string e array separados por barra (/) 
    //Ex.: "https://res.cloudinary.com/propria/image/upload/v1626793994/xdfybdy26mthp4qviiov.png"
    const nombreArr = modelo.img.split('/'); 
    const nombre = nombreArr[ nombreArr.length - 1 ];
    const [ public_id ]= nombre.split('.');/// A Função javascript split separa a string e array separados por ponto (.)

    ///teste para verificar arquivo extraido de claudiney
    //console.log ( nombre ); ///Exemplo arquivo completo 
    console.log ( public_id ); ///Exemplo arquivo cortado pelo ponto (.)
    cloudinary.uploader.destroy( public_id );

  }

  console.log(req.files.archivo) /// teste para mostrar as informações do arquivo enviad... extraido a doado do console tempFilePath

  const { tempFilePath  } = req.files.archivo;
  //const resp = await cloudinary.uploader.upload( tempFilePath ); ///Subir e obter todas  as informações da pasta temporaria para o cloudinary
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath );//// secure_url serve para pegar o endereço fisico da imagem no cloudinary
   
  modelo.img = secure_url;
  
  await modelo.save(); /// Salva na base de dados mongo a referencia do arquivo


  res.json ( modelo ); ///Exibir todas informações do cloudinary 
  //res.json ( { id, coleccion } );
  }
  
  





const mostrarImagen = async( req, res = response) => {

  const { id, coleccion } = req.params;


  console.log( { coleccion}  ); 

let modelo;

switch ( coleccion ) {
  case 'usuarios':
     modelo = await Usuario.findById(id);
     //console.log(modelo);

     if ( !modelo ){
      return res.status(400).json({
        msg: `No existe un usuario com el id ${ id }`
      });

     }
    break;

    case 'productos':
     modelo = await Producto.findById(id);
     if ( !modelo ){
      return res.status(400).json({
        msg: `No existe un produto com el idddd ${ id }`
      });

     }
    break;
    
    default:    
       res.status(500).json( { msg: 'Se me olvido valida esto ' } );
    }

///Limpiar imagenes previas / deixa apenas uma imagem ... verifica no banco a referencia do ultimo arquivo, exclui e substitui pela nova
//teste
//console.log( modelo )
if ( modelo.img ){
  //Hay que borrar la imagen del servidor
  const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
  if ( fs.existsSync ( pathImagen) ) { 
    //fs.unlinkSync ( pathImagen);
    return res.sendFile( pathImagen );

  }
}

///Envia uma imagem padrão quando o objeto não tem imagem associada
const pathImagen1 = path.join( __dirname, '../assets/no-found.jpg' );
res.sendFile( pathImagen1 );


//res.json ( { msg: 'Falta place holder '} );




}



module.exports = {
    cargaArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
  }