console.log('Novo Ticket HTML')




// Referencias del HTML
const lblNuevoTicket  = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button'); //Referencia para o primeiro botao html encontrado



const socket = io();




//Recebe o ultimo ticket
socket.on('ultimo-ticket', ( ultimo ) => {
    //console.log('Desconectado del servidor');

    lblNuevoTicket.innerText = "Ticket " + ultimo; /// Recebe o ultimo Ticket enviado pelo servidor e muda o texto Carregando para o numero do ticket correspondente

});


//Ativa e Desativa o botão  capturado com o primeiro botao da pagina... se desconecta cai

socket.on('connect', () => {
    // console.log('Conectado');
    btnCrear.disabled = false;   

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = true;
});


btnCrear.addEventListener( 'click', () => { 
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        //console.log('Desde el server: ', ticket );
        lblNuevoTicket.innerText = ticket; /// Muda o texto Carregando para o numero do ticket correspondente
    });

});



//console.log('Nuevo Ticket HTML');