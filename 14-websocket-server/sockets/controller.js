const { ticketControl } = require('../sockets/controller');





const socketController = (socket) => {
    /// Valida e Exibe no console se tem cliente conectado... função criada no arquivo socket-client dentro de public > js    
    ///A função socket.id é para exibir o identificador unicode cada cliente
    console.log('Cliente conectado', socket.id);  //scoket lado do cliente para exibir no console que está conectado

    
    socket.on( 'disconnect', () => {
        /// Valida e Exibe no console se o cliente desconectou... função criada no arquivo socket-client dentro de public > js
        ///A função socket.id é para exibir o identificador unicode cada cliente
        console.log('Cliente desconectado', socket.id);
    });        

    socket.on('enviar-mensaje', ( payload, callback ) => { ///Recebe aa mensagem enviada pelo lado do cliente
                
        const id = 123456;
        callback( id );
        
             
        //this.io.emit('enviar-mensaje', 'Desde el server' );
        ///this.io.emit('enviar-mensaje', payload );
        ///socket.emit('enviar-mensaje', payload ); ///Emitir Evento personalizado de forma invidual

        socket.broadcast.emit('enviar-mensaje', payload ); ///Emitir mensagem pra todos, exceto pra quem enviou


    });            


}

module.exports = {
    socketController

}