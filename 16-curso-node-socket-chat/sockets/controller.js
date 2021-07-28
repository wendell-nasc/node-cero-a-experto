const { Socket } = require( 'socket.io' );
const { comprobarJWT } = require('../helpers');
const { ChatMensajes } = require('../models');

chatMensajes = new ChatMensajes(); //Estancia objeto

const socketController = async ( socket = new Socket(), io ) => { ///Dispara com o sockets do models > servers.. O io é todas as clientes conectados, incluindo o usuarioq ue emite a mensagem
// A sintaxe ( socket = new Socket ) não deve usar.Porém, foi usado para fins didatico para importar a bibliciotaca sem precisar escrever e para o visual code identificar as funções das bibliotecas

    console.log ( 'cliente conectado', socket.id );

    ///console.log (socket ) //Recebe todas informações enviadas do cliente ṕelo scoket enviadas da pagina public > js > chat.js
    //console.log (socket.handshake.headers['x-token'] ) ///Recebe o token quando o cliente se conecta

    const token = socket.handshake.headers['x-token'] ; ///Armazena sempre o mesmo webtoken
    const usuario = await comprobarJWT( token ); ///Envia a função para comprovar se o token é valido

    if ( !usuario ){/// Se não existe token
        return socket.disconnect();
    }

    console.log('Se conecto', usuario.nombre )


    ///Usuario conectado - Emitir para todos os clientes
    //Agregar el usuario conectado
    chatMensajes.conectarUsuario ( usuario ); //Passa os usuarios
    io.emit('recibir-mensaje', chatMensajes.ultimos10 ); ///Enviar para todas






    //Conectarlo a una sala especial / privada
    socket.join ( usuario.id ); //Cada uusario pode conectar : Sala global,  socket.id e usario.id


    



    ///Desconectar o usuario
    chatMensajes.desconectarUsuario ( usuario.uid ); //Desconecta      
    io.emit( 'usuarios-activos', chatMensajes.usuariosArr ) ///Não precisa por broadcast, pois 'io' é pra todo muundo que está escutando





    ///Limpiar cuando alguien se desconecta
        socket.on( 'disconnect', () => {
        chatMensajes.desconectarUsuario( usuario.id );
        io.emit( 'usuarios-activos', chatMensajes.usuariosArr ) ///Não precisa por broadcast, pois 'io' é pra todo muundo que está escutando
    });






    ////Enviar mensahjem
    //socket.on ('enviar-mensaje', (payload) => { //Desestrurado logo abaixo
        socket.on ('enviar-mensaje', ({ uid, mensaje }) => {
        //console.log ( payload ) ///Recebe a informação do frontend e exibe no console
        console.log ( uid, mensaje ) ;

        if ( uid ){ //A mensagem foi enviada com uid
            //Mensaje privado
            socket.to ( uid ).emit ( 'mensaje-privado', { de: usuario.nombre, mensaje }) ///Envia a mensgem para a classe privada
            //io.emit('recibir-mensaje', chatMensajes.ultimos10 ); ///Enviar para todas

        }else {
            chatMensajes.enviarMensaje( usuario.id, usuario.nombre, mensaje );
            io.emit('recibir-mensaje', chatMensajes.ultimos10 ); ///Enviar para todas
    

        }      
      
    })
    

};


module.exports = {

    socketController
}