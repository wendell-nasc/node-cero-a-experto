import dotenv from 'dotenv'; ///IMPORTA O PACOTE DOTENV
import Server from './models/server';



///configuração DOTENV
dotenv.config(); /// PAra usar a configuração de DOTENV

//export const nombre = 'Wendell';
//console.log (nombre );

const server = new Server(); ///Estancia o servidor



server.listen(); ///Inicia o servidor estanciado para levantar