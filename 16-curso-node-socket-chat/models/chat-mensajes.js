
class Mensaje{

        constructor( uid, nombre, mensaje ) { ///REcebe as mensagens da class ChatMensajes
            this.uid        = uid;
            this.nombre     = nombre;
            this.mensaje    = mensaje;

        }
}

class  ChatMensajes {

    constructor () {

        this.mensajes = []; ///Array
        this.usuarios = {}; ///Objeto
        
    }


    get ultimos10() { ///Define as ultimas 10 mensagens
        this.mensajes = this.mensajes.splice(0,10);
        return this.mensajes;

    }

    get usuariosArr() {
        return Object.values ( this.usuarios ); // [ {} {} {} ] --> Retorna os usuários como um array

    }

    enviarMensaje( uid, nombre, mensaje ){
        this.mensajes.unshift( ///Envia as mensagens
            new Mensaje( uid, nombre, mensaje )
        );
    }

    conectarUsuario( usuario ) {
        this.usuarios[usuario.id]= usuario; ///Recebe o objeto usuario e agrega ele

    }
    
    desconectarUsuario ( id ) {
        delete this.usuarios[id]; ///Desconecta o usuario definido no metodo agregarUsuario
    
    }



}

module.exports = ChatMensajes;
