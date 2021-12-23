require('dotenv').config();

const {
  inquirerMenu,
  pause,
  leerInput,
  listarLugares,
  confirmar,
  mostrarListadoCheckList,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

require("colors");

const main = async () => {
  
  const busqueda = new Busquedas();

    let opt = '';

  do {
    opt = await inquirerMenu();

    switch (opt) {
        case '1':
            
            // mostrar mensaje
            const termino = await leerInput('Cuidad: ');
            
            //Buscar los lugares
            const lugares = await busqueda.ciudad(termino);
            
            
            
            // seleccionar el lugar
            const  id = await listarLugares(lugares);
            if( id === '0' ) continue;
            const lugarSel = lugares.find( l => l.id === id );
            // console.log(lugarSel)       
            
            busqueda.agregarHistorial(lugarSel.nombre)


            //clima
            const nosee = await busqueda.climaLugar(lugarSel.lat , lugarSel.lng);

            //mostrara resultados
            console.clear();
            console.log("\nInformacion de la ciudad\n".green);
            console.log("CIUDAD:", lugarSel.nombre)
            console.log("LAT:", lugarSel.lng)
            console.log("LON:", lugarSel.lat)
            console.log("TEMPERATURA:", nosee.temp)
            console.log("MINIMA:",nosee.min)
            console.log("MAXIMA:",nosee.max)
            console.log("DESCRIPCION:",nosee.desc.blue)
            break;
        case '2':
            busqueda.historialCapitalizado.forEach( (lugar,i)=>{
              // console.log(lugar)
              const indx = `${ i+1 }`.green
              console.log(`${ indx } ${ lugar } `)
            } )
            break;
        case '3':
    
            break;
    
        default:
            break;
    }
  
  
  
    
    await pause();


  } while (opt !== "0");
};

main();
