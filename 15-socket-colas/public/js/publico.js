const lblTicket1 = document.querySelector('#lblTicket1')
const lblEscritorio1 = document.querySelector('#lblEscritorio1')

const lblTicket2 = document.querySelector('#lblTicket2')
const lblEscritorio2 = document.querySelector('#lblEscritorio2')

const lblTicket3 = document.querySelector('#lblTicket3')
const lblEscritorio3 = document.querySelector('#lblEscritorio3')

const lblTicket4 = document.querySelector('#lblTicket4')
const lblEscritorio4 = document.querySelector('#lblEscritorio4')


console.log('Público HTML')

//divAlerta.style.display = 'none' ///Ocultar mensagem de erro alerta canto superior direito

const socket = io();


//Recebe os ultimos quatro Tickets
socket.on('estado-actual', ( payload ) => { // Array com os ultimos quatro tickets

    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();///Reproduzir audio de tickets


    ///console.log( payload ); ///Exibe os ultimos 4 tickets
    //lblNuevoTicket.innerText = "Ticket " + ultimo; /// Recebe o ultimo Ticket enviado pelo servidor e muda o texto Carregando para o numero do ticket correspondente
    const [ ticket1,  ticket2,  ticket3,  ticket4 ] = payload; //Desestrutura os ultimos quatro tickets

       
 
    lblTicket1.innerText = 'Ticket '+ ticket1.numero;    
    lblEscritorio1.innerText = 'Escritorio '+ ticket1.escritorio;    
        
     
    lblTicket2.innerText = 'Ticket '+ ticket2.numero;
    lblEscritorio2.innerText = 'Escritorio '+ ticket2.escritorio;
        
    lblTicket3.innerText = 'Ticket '+ ticket3.numero;
    lblEscritorio3.innerText = 'Escritorio '+ ticket3.escritorio; 
      
    lblTicket4.innerText = 'Ticket '+ ticket4.numero;
    lblEscritorio4.innerText = 'Escritorio '+ ticket4.escritorio;
    
  
  
});