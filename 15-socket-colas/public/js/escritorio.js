

console.log('Escritorio HTML')


// Referencias del HTML
const lblPendientes  = document.querySelector('#lblNuevoTicket');
const lblEscritorio = document.querySelector('h1'); //Referencia para o primeiro botao html encontrado
const btnAtender = document.querySelector('button'); //Referencia para o primeiro botao html encontrado
const lblTicket = document.querySelector('small'); //Colocar o numero do Ticket na pagina escritorio
const divAlerta = document.querySelector('.alert'); //Alerta
const lblPendientes1 = document.querySelector('#lblPendientes'); //Alerta






const searchParams = new URLSearchParams ( window.location.search ); //Armazena o endereço da URL

if ( !searchParams.has('escritorio')) {
    window.location = 'index.html'; ///Faz redirect se na pagina escritorio for digitado qualquer coisa diferente
    throw new Error('El escritorio es obligatorio')
}

///Exibir o nome do Escritorio no H1
const escritorio = searchParams.get('escritorio');//captura o escritorio que entrou na URL
console.log({ escritorio }); //Exibe console
lblEscritorio.innerText = escritorio; ///





divAlerta.style.display = 'none' ///Ocultar mensagem de erro alerta canto superior direito

const socket = io();




//Recebe o ultimo ticket
socket.on('ultimo-ticket', ( ultimo ) => {
    console.log('ultimo-ticket', ultimo );
   // lblTicket.innerText = "Ticket " + ultimo; /// Recebe o ultimo Ticket enviado pelo servidor e muda o texto Carregando para o numero do ticket correspondente

});

//Recebe o ultimo ticket
socket.on('tickets-pendientes', ( pendientes ) => {
   // console.log('tickets.length', pendientes );
    //lblNuevoTicket.innerText = "Ticket " + ultimo; /// Recebe o ultimo Ticket enviado pelo servidor e muda o texto Carregando para o numero do ticket correspondente
    
    if ( pendientes === 0 ){
        lblPendientes1.style.display = 'none'    ///Desativa o display

    }else{
        lblPendientes1.style.display = ''    ///ativa o display
        lblPendientes1.innerText = pendientes;
    }
    
   
});

//Ativa e Desativa o botão  capturado com o primeiro botao da pagina... se desconecta cai
socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;  
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});


btnAtender.addEventListener( 'click', () => {

    //socket.emit( 'atender-ticket', { escritorio }, ( payload ) => { ///configurado no models > ticket-control  , envia o obketo escritorio
        socket.emit( 'atender-ticket', { escritorio }, ( { ok, ticket, pendientes, msg} ) => { ///Payload desestruturado

        //console.log( payload ); ///Imprime no console no backend escritorio enviado
        //console.log( ok, ticket, pendientes );

        if ( !ok ){ // Só exibe se mensagem for verdadeira
                lblTicket.innerText = 'Nadie. '
                return divAlerta.style.display = ''// Ativa caixa de alerta CSS qunado retronar qualquer erro que não seja ticket

            };

            lblTicket.innerText = 'Ticket ' + ticket.numero;
            
         
            lblPendientes1.innerText = pendientes;



        //btnAtender.innerText = ticket; /// Muda o texto Carregando para o numero do ticket correspondente

        if ( pendientes === 0 ){
            lblPendientes1.style.display = 'none'    ///Desativa o display
        }

    });


});

