import {sleep} from "./tiempo.mjs"

export async function controlErrores(error){
    await sleep(500)

    switch(error.name){
        case 'SequelizeUniqueConstraintError': console.error("❌El tipo que esta tratando de insertar ya existe"); 
        break;

        case 'SequelizeForeignKeyConstraintError': console.error("❌Violacion de clave foranea"); 
        break;

        case 'SequelizeValidationError': console.error("❌Error de validacion: ", error.errors.map(e => e.message).join(',')); 
        break;

        case 'SequelizeDatabaseError': console.error("❌Error con la base de datos", error.original?.sqlMessage || error.message); 
        break;

        case 'SequelizeConnectionError': console.error("❌Error con la conexion de la base de datos")

        default: console.error('❌Error no especificado:', error);
    }
}