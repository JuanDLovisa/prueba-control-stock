import { inquirerActualizarTipo, inquirerConfirmar } from "../../otros/inquirer_menu.mjs"
import inquirer from "inquirer"
import { mostrar_tipos } from "../../otros/traer_datos.mjs"
import { input } from "../../utils.mjs"
import { sequelize } from "../../conexion.mjs"
import { controlErrores } from "../../otros/errores.mjs"
import { QueryTypes } from "sequelize"
import {sleep} from "../../otros/tiempo.mjs"

export async function actualizar_tipo(){
    await sleep(500)
    const hayTipos = await mostrar_tipos()

    if(hayTipos.length > 0){
        const actualizarTipo = await inquirer.prompt(inquirerActualizarTipo)
        const {nombreAnterior, nombreNuevo} = actualizarTipo
        const replacements = {nombreAnterior, nombreNuevo}

        if(nombreNuevo == ""){
            await sleep(500)
            await input("❌No deben quedar campos vacios, presione Enter para regresar al menu...")
            return
        }

        try{
            const sql = "UPDATE tipo_p_s SET tipo = :nombreNuevo where tipo = :nombreAnterior"

            await sequelize.query(sql,{
                replacements,
                type: QueryTypes.UPDATE
            })
            await sleep(500)
            console.log("Tipo actualizado ✅")
        }
        catch(error){
            await sleep(500)
            console.error("❌Ha ocurrido un error al actualizar el tipo")
            await controlErrores(error)
        }
    }
    else{
        await sleep(300)
        console.error("❌Actualmente no hay tipos para actualizar")
    }
    
    await sleep(500)
    await inquirer.prompt(inquirerConfirmar)
}