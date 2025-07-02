import { inquirerSalir } from "../otros/inquirer_menu.mjs";
import inquirer from "inquirer";
import { sequelize } from "../conexion.mjs";
import { sleep } from "../otros/tiempo.mjs";

export async function salir(){
    const salir = await inquirer.prompt(inquirerSalir)
    await sleep(500)
    
    if(salir.salir === true){
        console.log("Saliendo del programa...")
        await sleep(500)
        await sequelize.close();
        process.exit(0);
    }
    console.log("Regresando al menu...")
    await sleep(500)
}