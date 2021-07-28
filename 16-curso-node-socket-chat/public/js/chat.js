console.log('Chat HTML')

///Validar se o JWT é correto antes de chamar o socket

const url = ( window.location.hostname.includes('localhost') )
? 'http://localhost:8081/api/auth/'
: 'https://webserver-node2021.herokuapp.com/api/auth/';



let usuario = null;
let socket = null;



///Referencias HTML
const txtUid        = document.querySelector('#txtUid')
const txtMensaje    = document.querySelector('#txtMensaje')
const ulUsuarios    = document.querySelector('#ulUsuarios')
const ulMensaje    = document.querySelector('#ulMensaje')
const btnSalir      = document.querySelector('#btnSalir')
const ulPrivado    = document.querySelector('#ulPrivado')




//Função validar JWT del localstorage
const validarJWT = async() => {

    const token = localStorage.getItem('token') || ''; ///Se não vem token deixa como uma string vazia

    if ( token.length <= 10 ){
        window.location = 'index.html'; //Redirect
        throw new Error ('No hay token en el servidor');
    }

    const resp = await fetch (url, { 

        headers: { 'x-token': token } //igual variavel armazenada no localstorage
    });

    const { usuario: userDB, token: tokenDB } = await resp.json(); ///Desestrutura e retorna as variaveis da requisição
    ///Agrupa os objetos retornados em dois objetos, userDB e tokenDB
    console.log(userDB, tokenDB);


    //Renovar JWT por página
    localStorage.setItem( 'token', tokenDB ); //Dar uma nova vida por token
    usuario = userDB;
    document.title = usuario.nombre; ///Insere o nome do usuário no titulo da página


    ///chama a função conectar socket io
    await conectarSocket();

}

//Função de Socket.... Já foi validado se hohube erro antes de chegar nessa pelas funções anteriores
const conectarSocket =  async() => {

    socket = io ({ 
        'extraHeaders':{
            'x-token': localStorage.getItem ( 'token')
        }

    }); //Estabelece a função com o backend server


    ///Criação dos eventos qdo o sockets se dispara

    ///Cliente Online e Offlie
    socket.on('connect', () => {
        console.log('Sockets online')
    })

    socket.on('disconnect', () => {
        console.log('Sockets offline')
    })





    ///Cliente Reciber Mensage
    //Ex.1:    
    socket.on('recibir-mensaje', ( payload ) => {
        //TODO:
        console.log( payload );
        dibujarMensajes ( payload )
    })    
   //Ex.2
   //socket.on('recibir-mensaje', dibujarMensajes);
   //Recebe o payload e já chama a função dibujarUsuarios logo abaixo passando o payload

    


    ///Exobir Cliente conectado    
    //Exemplo 1 função completa... Logo abaixo, forma otimizada já mandando direto o objeto 
    socket.on('usuarios-activos', ( payload ) => { /// Recebe todos os clientes ativos no chat
        //TODO:
        console.log( payload ); ///Exibe todas informações retornadas
        dibujarUsuarios( payload )///Chama a função dibujarUsuarios logo abaixo envinado o payload
    });    
   //Exemplo 2 função otimizada
   //socket.on('usuarios-activos', dibujarUsuarios );
   //Recebe o payload e já chama a função dibujarUsuarios logo abaixo passando o payload
   



    /*

    ///Cliente emitir Mensage Privado
    socket.on('mensaje-privado', (payload) => { /// Saber os clientes ativos/onlines
    //TODO:
    console.log( 'Privado: ', payload );
    });
    
    */




      ///Cliente Reciber Mensage
    //Ex.1:    
    socket.on('mensaje-privado', ( payload ) => {
        //TODO:
        console.log( payload );
        dibujarPrivado ( payload )
    })    
   //Ex.2
   //socket.on('recibir-mensaje', dibujarMensajes);
   //Recebe o payload e já chama a função dibujarUsuarios logo abaixo passando o payload







    ///Exibir Usuarios conectados 
const dibujarUsuarios = ( usuarios = []) => { ///Recebe o payload enviado através da variavel dibujarUsuarios e transforma em usuarios
    let usersHtml = '';
    usuarios.forEach( ({ nombre, uid }) => { //Desestruturou o user com o bigode { } e pega as variaveis nombre, uid
    
        usersHtml += ` 
        <li>
              <p>
                 <h5 class="text-sucess"> ${ nombre }  </h5>
                 <span class = "fs-6 text-muted"> ${ uid } </span>
              </p>   

        </li>
                    `;//barticles " ` ` " multipla slinhas

    });

    //console.log( usersHtml );
    ulUsuarios.innerHTML = usersHtml;

    }




    ///Exibir Mensagens conectados 
const dibujarMensajes = ( mensajes = []) => { ///Recebe o payload enviado através da variavel dibujarUsuarios e transforma em usuarios

    let mensajesHTML = '';
    mensajes.forEach( ({ nombre, mensaje }) => { //Desestruturou o user com o bigode { } e pega as variaveis nombre, uid
    
        mensajesHTML += ` 
        <li>
              <p>
                 <span class="text-primary"> ${ nombre }  </span>
                 <span > ${ mensaje } </span>
              </p>   

        </li>
                    `;//barticles " ` ` " multipla slinhas

    });

    //console.log( mensajesHTML );
    ulMensaje.innerHTML = mensajesHTML;

    }



      ///Exibir Mensagens Privadas 
const dibujarPrivado = ( mensajes ) => { ///Recebe o payload enviado através da variavel dibujarUsuarios e transforma em usuarios

    //mensajes = { de, mensaje } ;

    let mensajesHTMLp = '';
   // mensajes.forEach( ({ de, mensaje }) => { //Desestruturou o user com o bigode { } e pega as variaveis nombre, uid
    
        mensajesHTMLp += ` 
        <li>
              <p>
                 <span class="text-primary"> !!! Privado !!!${ mensajes.de }  </span>
                 <span > ${ mensajes.mensaje } </span>
              </p>   

        </li>
                    `;//barticles " ` ` " multipla slinhas

    //});

    //console.log( mensajesHTMLp );
    ulPrivado.innerHTML = mensajesHTMLp;



    

    }


    //txtMensaje.addEventListener('keyup', ( ev })  => { // A função java keyup captura os eventos de todas as telas digitadas
    txtMensaje.addEventListener('keyup', ({ keyCode })  => { // A função java keyup captura os eventos de todas as telas digitadas
        // O keyCode é o id da tecladigitada ...verificar no console
        /// O keyCode 13 corresponde a tecla ENTER
        const mensaje   = txtMensaje.value;
        const uid       = txtUid.value;

        if ( keyCode !== 13 ){///Diferente de enter
            return;
        }
        
        if ( mensaje.length === 0 ){///Mensagem igual a zero, não foi digitado nada
            return;
        }

        //console.log(ev); ///Exibe as teclas digitadas no brownser
        console.log(keyCode); ///Exibe as teclas digitadas no brownser
        socket.emit( 'enviar-mensaje', { mensaje, uid } );  ///Envia as duas variaveis como objeto colocando dentro do bigode { }
        
        txtMensaje.value = ''; //Limpa os cursos
        txtUid.value = ''; //Limpa os cursos

    })



//}


   



} ///Fim função sockets

//Funcao main
const main = async () => {

    //Chama a função Validar JWT
await validarJWT();


}



//Chama a função main
main();


