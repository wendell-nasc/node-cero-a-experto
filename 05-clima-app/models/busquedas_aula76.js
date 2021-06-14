const axios = require('axios');

class Busquedas {

     // _historial  = {};

    constructor() {

        /// TODO: leer DB si existe

    }

    get paramsMapBox() {
        return { 

        'access_token' : process.env.MAPBOX_KEY,
        'limit': 5,
        'language' :'es'

        }
    }



    async ciudad ( lugar = '' ) { 

        //petición http

        //console.log('ciudad', lugar);


        ////Pacote NPM Axios para extrair  as informações da API

        try { ///Try para 


            /// Variaveis de entorno da aplicação ... credencial
        
        const intance = axios.create({ 
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
            params : this.paramsMapBox

        });

        const resp = await intance.get();
        
        
        //// funcionalidade data de axions retorna apenas os dados do json
        //console.log( resp.data);

            ///const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/-3.6928015202532833%2C40.45336561197769.json?access_token=pk.eyJ1Ijoid2VuZGVsbC1uYXNjIiwiYSI6ImNrcHQyY2VjdDB5MmcycG11dGh1Njg1d3kifQ.YeZgfK_AI0EOdUkA77KEeg&cachebuster=1623462986752&autocomplete=true&types=region&limit=5&language=es');


        /// Exemplo para extrair todas informações da API

        ///console.log(resp);

        /// Exemplo para extrair somente os dados da API em JSON
        
        ///console.log(resp.data);


        ///Tudo ....Do Axios sempre vai retornar datas... parautilizar individualment precisa usar o componente Features
        ///console.log(resp.data.features);


        //Tudo ....Do Axios sempre vai retornar datas... parautilizar individualment precisa usar o componente Features
        ///({}) ---> retornar um objeto de forma implicita 
      
        
        return resp.data.features.map ( lugar => ({ 
            id: lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1]


        }));
            
        } catch (error) {
            return [];
            
        }
     

       
    }



}



module.exports = Busquedas;