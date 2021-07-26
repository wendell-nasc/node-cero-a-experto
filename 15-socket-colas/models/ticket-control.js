const path = require('path');
const fs = require ('fs'); ///File System para gravar arquivo local



class Ticket {
    constructor ( numero, escritorio ) {
        this.numero = numero;
        this.escritorio = escritorio;

    }
    




}
class TicketControl {

constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();/// Saber que tem na base de dados se igual a hoje
    this.tickets = [];
    this.ultimos4 = []; ///Exibe os ultimos tickets no painell.. definido quatro

    this.init();/// Ler o arquvido da base json e estabelece as propriedades

}

get toJson() { ///Função para definir o formato dos registros na base json db>data.json
    return {
        ultimo: this.ultimo,
        hoy: this.hoy,
        tickets: this.tickets,
        ultimos4: this.ultimos4
    }

}

    init() { //função para lear arquivo json
    const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json');
    
    
    const data = { hoy, tickets, ultimo, ultimos4 } ;
    console.log(data);


    ///Dia atual
    if ( hoy === this.hoy ) { /// compara se o dia de hoje é igual a do arquivo json

        this.tickets = tickets;
        this.ultimo = ultimo;
        this.ultimos4 = ultimos4;
    }else{
    ///Outro dia
    this.guardarDB();   ///Chama função para guardar
    }

   

}


guardarDB() { ///Guardar na base json

    const dbPath = path.join( __dirname, '../db/data.json');/// O arquivo db>data.json precisa estar no formato correto da funç~ao init()
    fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) ); /// a JSON.stringify( converte em json

}








siguiente () { ///Chama a classe Ticket para incrementar mais um ticket

    this.ultimo += 1;
    const ticket = new Ticket ( this.ultimo, null );
    this.tickets.push ( ticket );

    this.guardarDB(); ///chama a função guardarDB para armazenar a informação do ticket
    return 'Ticket ' + ticket.numero;

}

atenderTicket ( escritorio ){ /// Recebe o nome do Escritorio que vai atender o ticket
    
    //No temos tickets
    if ( this.tickets.length === 0 ) {

        return null;
    }

    ///saber qual é o numero do ticket
    //const ticket = this.tickets[0];//logica para remover ticlet da lista
    const ticket = this.tickets.shift(); ///A função shift remove o primeiro array e retorna
    ticket.escritorio = escritorio;

    this.ultimos4.unshift( ticket );//A função unshift adiciona um novo elemento ao array

    ///validar que sempre sejam quatro tickets
    if ( this.ultimos4.length > 4 ) { ///A função length retona a qtde de elementos do array
        this.ultimos4.splice( -1, 1) ///Remove a ultima posição do array corta um
        //console.log( "ticket: " + ultimos4 ) //
        
    }



    this.guardarDB(); ///Guardar banco
    
    return ticket;



}


}

module.exports =    TicketControl;