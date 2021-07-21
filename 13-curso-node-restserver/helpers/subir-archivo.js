

const path = require('path');///resolver o problema de path fora da pasta
const { v4: uuidv4 } = require('uuid');



const subirArchivo = ( files, extesionValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise( ( resolve, reject ) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');/// corta o nome do arquivo  e separa o nome da extensao
        const extesion = nombreCortado [ nombreCortado.length -1 ]; /// Capturar a extensão do array nombreCortado armazenado na posicao 1
        //console.log( nombreCortado ) 
    
    
        ///Validar as extesiones
    
        ///trecho inserido na funcao promessa
        ///const extesionValidas = ['png', 'jpg', 'jpeg', 'gif'];// Extenções permitidas
           if( !extesionValidas.includes( extesion ) ){ 
            return reject (`La extesion ${ extesion } no es permitida -  ${ extesionValidas }`)
            };
            
    
    
       
        const nombreTemp= uuidv4() + '.' + extesion; ///Nome temporario do arquivo gerado aleatoriamente
        
      
        //const uploadPath = path.join( __dirname, '../uploads/', archivo.name ); ///Gera o arquivo com o nome origial na pasta uploads
        const uploadPath = path.join( __dirname, '../uploads/', carpeta,  nombreTemp ); ///Gera o arquivo com o nome aleatorio do UUI na pasta uploads
    
    
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
            reject( err );
          }
      
          //resolve(uploadPath ); Retorna o endereço da pasta onde foi salva o arquivo no endpoint
          //resolve( { nombreTemp, uploadPath });//Retorna  o nome do arquivo gerado
          resolve( nombreTemp );//Retorna  o nome do arquivo gerado

        });    

    
    });

};

module.exports = {
    subirArchivo

}