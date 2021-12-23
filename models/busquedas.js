const fs = require('fs');

const axios = require("axios");

class Busquedas {

    dbPath = './db/database.json';
    
    historial = [];
    constructor() {
    // Todo:
        this.leeDB();
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      // peticion http
      const instans = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      // const resp = await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/uruguay.json?access_token=pk.eyJ1IjoiY3Jpc3RpYW5jaGlwYW5hIiwiYSI6ImNrc2RwY2t0MTBzeTkycHF0eHRvaWJ4ZXoifQ.Vl6olLHN8Spl3jsjdgrJfw&limit=6&language=es");
      const resp = await instans.get();
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
      // retorna las ciudades que conciadas los
    } catch (error) {
      console.log("auxiliooooooooo :/", error);
      return [];
    }
    // Hacemos la peticion HTTP
    // console.log(lugar);
  }

  get paramsWeather() {
    return {
        appid: "5c4b734cba1044a9eadf17813fafe9fc",          
        units:"metric",
        lang:"es"
    };
  }

  async climaLugar( lat, lon ){
        try {
            const instans = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather,lat,lon}
                // params: {
                //     lat,
                //     lon,
                //     appid: "5c4b734cba1044a9eadf17813fafe9fc",          
                //     units:"metric",
                //     lang:"es"
                // },
              });
        
              
              const resp = await instans.get();
              return {
                desc : resp.data.weather[0].description,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                temp : resp.data.main.temp
              };
        } catch (error) {
            console.log("*************************** ayudame pero no me dejes")
            console.log(error)
        }
  }

  agregarHistorial(lugar=''){
      // prevenir duplicados
      if( this.historial.includes( lugar.toLocaleLowerCase() ) ){
          return;
      }
      this.historial = this.historial.splice(0,5);
      // grabar
      this.historial.unshift( lugar.toLocaleLowerCase() );
      this.guardarBD()
  }

  guardarBD(){
      const payload = {
          historial: this.historial
      }

      fs.writeFileSync( this.dbPath , JSON.stringify( payload ) )
  }

  get historialCapitalizado(){


      return this.historial.map( lugar =>{

        let palabras = lugar.split(' ');
        palabras = palabras.map( p=> p[0].toUpperCase() + p.substring(1) );
          return palabras.join(' ')
      } )
  }

  leeDB(){
    console.log("222222222222222222222222222222")
      // verificar que exi
      if( !fs.existsSync(this.dbPath)){
          return;
      }

      const info =  fs.readFileSync( this.dbPath, {encoding : 'utf-8'} );

      const data = JSON.parse( info );  
      console.log(data)
      this.historial = data.historial
  }



}

module.exports = Busquedas;
