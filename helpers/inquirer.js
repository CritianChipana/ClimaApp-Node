const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "que desea?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Buscar Ciudad`,
      },
      {
        value: "2",
        name: "2. Historial",
      },

      {
        value: "0",
        name: "0. Salir",
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("=====================".green);
  console.log("Seleccione la opcion".white);
  console.log("=====================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pause = async () => {
  console.log("\n");
  const preguntas2 = [
    {
      type: "input",
      name: "cosas",
      message: `Presione ${"enter".green} para salir\n `,
    },
  ];

  await inquirer.prompt(preguntas2);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const BorrarTarea = async (tareas = []) => {
  const preguntaTy = tareas.map((tarea, i) => {
    return {
      value: tarea.id,
      name: `${i + 1}`.green + `${tarea.desc}`,
    };
  });

  preguntaTy.unshift({
    value: "0",
    name: "0.".green + "Cancelar",
  });

  const pregunta = [
    {
      type: "list",
      name: "id",
      messages: "Borrar",
      choices: preguntaTy,
    },
  ];
  const { id } = await inquirer.prompt(pregunta);

  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);

  return ok;
};

const mostrarListadoCheckList = async (tareas = []) => {
  const preguntaTy = tareas.map((tarea, i) => {
    return {
      value: tarea.id,
      name: `${i + 1}`.green + `${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      messages: "Borrar",
      choices: preguntaTy,
    },
  ];
  const { ids } = await inquirer.prompt(pregunta);

  return ids;
};

const listarLugares = async (  lugares = [])=>{

    const preguntaTy = lugares.map((lugar, i) => {
        return {
          value: lugar.id,
          name: `${i + 1}`.green + `${lugar.nombre}`,
        };
      });
    
      preguntaTy.unshift({
        value: "0",
        name: "0.".green + "Cancelar",
      });
    
      const pregunta = [
        {
          type: "list",
          name: "id",
          messages: "Seleccione",
          choices: preguntaTy,
        },
      ];
      const { id } = await inquirer.prompt(pregunta);
    
      return id;

};

module.exports = {
  inquirerMenu,
  pause,
  leerInput,
  BorrarTarea,
  confirmar,
  mostrarListadoCheckList,
  listarLugares
};
