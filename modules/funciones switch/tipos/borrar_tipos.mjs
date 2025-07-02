import { inquirerBorrarTipo, inquirerConfirmar } from "../../otros/inquirer_menu.mjs"
import inquirer from "inquirer"
import { mostrar_tipos } from "../../otros/traer_datos.mjs"
import { sequelize } from "../../conexion.mjs"
import { controlErrores } from "../../otros/errores.mjs"
import { QueryTypes } from "sequelize"
import {sleep} from "../../otros/tiempo.mjs"

export async function borrar_tipo(){
    await sleep(500)
    const hayTipos = await mostrar_tipos()

    if(hayTipos.length > 0) {
        const {nombreTipo} = await inquirer.prompt(inquirerBorrarTipo)

        try{
            const sql = "DELETE from tipo_p_s where tipo = :nombreTipo"

            await sequelize.query(sql,{
                replacements:{nombreTipo},
                type: QueryTypes.DELETE
            })
        await sleep(500)
            console.log(`${nombreTipo} fue eliminado correctamente ✅`)
        }
        catch(error){
            await sleep(500)
            console.error("❌Ha ocurrido un error al borrar el tipo, revise que no haya productos cagados con este tipo")
            await controlErrores(error)
        }
    }
    else{
        await sleep(300)
        console.error("❌Actualmente no hay tipos para borrar")
    }

    await sleep(500)
    await inquirer.prompt(inquirerConfirmar)
}