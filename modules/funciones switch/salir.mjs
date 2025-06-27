import { inquirerSalir, inquirerConfirmar } from "../inquirer_menu.mjs";
import inquirer from "inquirer";
import { input } from "../utils.mjs";
import { sequelize } from "../conexion.mjs";

export async function salir(){
    const salir = await inquirer.prompt(inquirerSalir)

    if(salir.salir === true){
        console.log("Saliendo del programa... presione enter")
        await input("")
        await sequelize.close();
        process.exit(0);
    }
    await inquirer.prompt(inquirerConfirmar)
}