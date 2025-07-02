import { inquirerCrearTipo, inquirerConfirmar } from "../../otros/inquirer_menu.mjs"
import inquirer from "inquirer"
import { mostrar_tipos_tabla } from "../../otros/traer_datos.mjs"
import { input } from "../../utils.mjs"
import { sequelize } from "../../conexion.mjs"
import { controlErrores } from "../../otros/errores.mjs"
import { QueryTypes } from "sequelize"
import {sleep} from "../../otros/tiempo.mjs"

export async function agregar_tipo(){
    await sleep(500)
    await mostrar_tipos_tabla()
    const {nombreTipo} = await inquirer.prompt(inquirerCrearTipo)
    
    if(nombreTipo == ""){
        await sleep(500)
        await input("❌No deben quedar campos vacios, presione Enter para regresar al menu...")
        return
    }

    try {
    const sql = `INSERT INTO tipo_p_s (tipo) VALUES (:nombreTipo)`;

    await sequelize.query(sql, {
    replacements: {nombreTipo},
    type: QueryTypes.INSERT
    });

    await sleep(500)
    console.log(`Tipo de producto: ${nombreTipo} insertado correctamente ✅`);
    } catch (error) {
        await sleep(500)
        console.error("❌Ha ocurrido un error al agregar el tipo")
        await controlErrores(error)
    }
    await sleep(500)
    await inquirer.prompt(inquirerConfirmar)
}