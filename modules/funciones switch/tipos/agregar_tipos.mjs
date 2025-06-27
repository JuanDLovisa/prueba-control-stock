import { inquirerCrearTipo, inquirerConfirmar } from "../../inquirer_menu.mjs"
import inquirer from "inquirer"
import { mostrar_tipos_tabla } from "../../traer_datos.mjs"
import { input } from "../../utils.mjs"
import { sequelize } from "../../conexion.mjs"
import { controlErrores } from "../../errores.mjs"
import { QueryTypes } from "sequelize"

export async function agregar_tipo(){
    await mostrar_tipos_tabla()
    const crearTipo = await inquirer.prompt(inquirerCrearTipo)
    const nombreT = crearTipo.nombreTipo
    
    if(nombreT == ""){
        await input("❌No deben quedar campos vacios, presione Enter para regresar al menu...")
        return
    }

    try {
    const sql = `INSERT INTO tipo_p_s (tipo) VALUES (:nombreT)`;

    await sequelize.query(sql, {
    replacements: {nombreT},
    type: QueryTypes.INSERT
    });

    console.log(`Tipo de producto: ${nombreT} insertado correctamente ✅`);
    } catch (error) {
        console.error("❌Ha ocurrido un error al agregar el tipo")
        await controlErrores(error)
    }
    await inquirer.prompt(inquirerConfirmar)
}