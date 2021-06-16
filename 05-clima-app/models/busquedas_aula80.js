const fs = require('fs');

const axios = require('axios');

class Busquedas {

//historial  =  ['Santos'];
    
//historial = [];




//this.historial = ['Santos', 'Guaruja'];

constructor() {

        /// TODO: leer DB si existe
        this.leerDB();
        

    }

        /// Transformar a primeira letra de cada palavra em maiuscula maiuscula

    get historialCapitalizado() {
        return this.historial.map( lugar => {
            /// Cortar as palavras pelo espaco ` `
            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

            return palabras.join(' ')

        })
    }



    


    get paramsMapBox() {
        return { 

        'access_token' : process.env.MAPBOX_KEY,
        'limit': 5,
        'language' :'es'

        }
    }

        get paramsOpenWeather() {
            return { 
            'appid' : process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang' :'es'
    
            }
        }



    async ciudad ( lugar = '') { 

       
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

        /// Exemplo para extrair } somente os dados da API em JSON
        
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


    async climaLugar ( lat = '', lon = '' ) { 

       
        //petición http

        //console.log('ciudad', lugar);


        ////Pacote NPM Axios para extrair  as informações da API

        try { ///Try para 


            /// Variaveis de entorno da aplicação ... credencial
        
        ///api.openweathermap.org/data/2.5/weather?lat=-22.109489481&lon=-49.0703911972935&appid=e474f9c86044e0ba4723a31cd5ec073a&units=metric&lang=es

        const intance1 = axios.create({ 
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params : { ...this.paramsOpenWeather,lat,lon }

        });

        const resp1 = await intance1.get();
        
        //Desestrturar os dados do objeto data recebido da API
        const {weather, main} = resp1.data;
    
               
        return { 
            
            temp: main.temp,
            min: main.temp_min,
            max: main.temp_max,
            desc: weather[0].description          

        }       
            
        } catch (error) {
            console.log(error);
            
        }
     

       
    }

        agregarHistorial( lugar = '' ) {

        //TODO: PREVENIR DPLICADOS

       ///  this.historial.unshift ( lugar );

        
       const historial = ['Santos'];
      

       if ( historial.includes( lugar.toLocaleLowerCase())){
           return;
        }

        historial.push ( lugar.toLocaleLowerCase() );
   
        // historial.push ( lugar );


        // Grabar en DB
        this.guardarDB();
            
        }


        guardarDB() {

            const payload = {
                historial: this.agregarHistorial.historial
                                // 
            };
            
            console.log( payload );


            //fs.writeFileSync( this.agregarHistorial.dbPath, JSON.stringify( payload ) );
            fs.writeFileSync( './db/database.json', JSON.stringify( payload ) );
    
        }


        // SON.stringify = Converte java para o formato , JSON.parse = desconverte para java
    
        leerDB() {
    
            if( !fs.existsSync( this.dbPath ) ) return;
            
            const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' });
            const data = JSON.parse( info );
    
            this.agregarHistorial.historial = data.historial;
    
    
        }


}



module.exports = Busquedas;