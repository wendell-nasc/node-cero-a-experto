
const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();


const socketController = (socket) => {
    
    ///Informações de Cliente Conectado
    console.log('Cliente conectado', socket.id );

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    
    //Envia o ultimo Ticket para o cliente
    socket.emit ( 'ultimo-ticket', ticketControl.ultimo ); //envia informação do ultimi ticket


    
    //Envia os ultimos quatro Tickets pro cliente
    //socket.emit( 'estado-actual', ticketControl.ultimos4) ///Enviar para a pagina nouevo ticket apenas
    socket.emit( 'estado-actual', ticketControl.ultimos4) ///


    ///Atualizar pendnecia de tickets
    socket.emit( 'tickets-pendientes', ticketControl.tickets.length) /// Envia a qtde de tickets na fila
    


    //Pagina Novo Ticket - Recebe e envia o ticket seguinte para o cliente   
    socket.on('siguiente-ticket', ( payload, callback ) => { /// retornar o numero do ticket
        
       const siguiente = ticketControl.siguiente(); //Obter o numero do ticket
        
        callback(siguiente);//devolve para o cliente o numero do ticket

        const pendientes = ticketControl.tickets.length;
        socket.broadcast.emit( 'tickets-pendientes', pendientes) ///Broadcast tickets da fila

        //TODO: Notificar que hay un nuevo ticket pendiente de asignar
        //
    });


    //Pagina Escritorio - Recebe e envia o ticket seguinte    para o cliente 
    socket.on('atender-ticket', ( { escritorio } , callback ) => { /// retornar o numero do ticket          
    ///const siguiente = ticketControl.siguiente(); //Obter o numero do ticket
     console.log( escritorio );
     if ( !escritorio ){ // mensagem de erro para escritorio nullo

        return callback( { 

            ok: false,
            msg: 'Es escritorio es obligatorio'
        });
    }

    const ticket = ticketControl.atenderTicket ( escritorio );
    const pendientes = ticketControl.tickets.length;
    ;
    console.log( 'ticket_ultimo', pendientes);

    socket.broadcast.emit( 'estado-actual', ticketControl.ultimos4) ///Duplicado a função de enviar as atualizações dos ultimos tickets com broadcast
    socket.broadcast.emit( 'tickets-pendientes', pendientes) ///Broadcast tickets da fila

     if ( !ticket ){ // mensagem de erro para escritorio nullo
        callback( { 
            ok: false,
            msg: 'Ya no hay tickets pendientes'
        });
    } else {
        callback( { 
            ok: true,
            ticket,pendientes
        });
    }    


}); /// funcoes secundárias








} //Funcação principal




module.exports = {
    socketController
}

