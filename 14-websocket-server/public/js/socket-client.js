// Referencia del HTML

const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')

const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')

//scoket lado do cliente, mantem a comunicação com o servidor
const socket = io ();

socket.on('connect', () => {//scoket lado do cliente para exibir no console que está conectado
    //console.log('Conectado') // Exibe no console

    lblOffline.style.display = 'none';//Não mostrar
    lblOnline.style.display = ''; //Mostrar

});

socket.on('disconnect', () => {//scoket lado do cliente para exibir no console que está desconectado
    ///console.log('Desconectado del servidor')// Exibe no console


    lblOnline.style.display = 'none'; //Não mostrar
    lblOffline.style.display = '';//Mostrar


});


socket.on('enviar-mensaje', ( payload ) => { /// Escutar o enviar-mensaje enviado enviado do servidor (models > server) 

    console.log( payload ) /// O payload recebido do  do servidor (models > server) ... pode ser alterado para um texto qualquer local


});



btnEnviar.addEventListener ( 'click', () =>{

    const mensaje = txtMensaje.value;
    const payload = { 
        mensaje,
        id: '12121213545abc',
        fecha: new Date().getTime()
    }
    
    
    //console.log(mensaje);
    //console.log(payload);


    
    //socket.emit( 'enviar-mensaje', payload ) ///Enviar mensagem pro servidor, configurado no model server socket
    
    
  
    socket.emit( 'enviar-mensaje', payload, ( id ) => {
        console.log( 'Desde ellllll server ', id );
    });///Pode se enviar um terceiro argumento com a identificação do cliente
    
    ///socket.on (Escutar)
    ///socket.emit (Emitir mensagem )

   
});

