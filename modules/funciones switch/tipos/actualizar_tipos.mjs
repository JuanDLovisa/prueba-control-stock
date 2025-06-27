import { inquirerActualizarTipo, inquirerConfirmar } from "../../inquirer_menu.mjs"
import inquirer from "inquirer"
import { mostrar_tipos } from "../../traer_datos.mjs"
import { input } from "../../utils.mjs"
import { sequelize } from "../../conexion.mjs"
import { controlErrores } from "../../errores.mjs"
import { QueryTypes } from "sequelize"

export async function actualizar_tipo(){
    const hayTipos = await mostrar_tipos()

    if(hayTipos.length > 0){
        const actualizarTipo = await inquirer.prompt(inquirerActualizarTipo)
        const anteriorNombreT = actualizarTipo.nombreAnterior
        const nuevoNombreT = actualizarTipo.nombreNuevo

        if(nuevoNombreT == ""){
            await input("❌No deben quedar campos vacios, presione Enter para regresar al menu...")
            return
        }

        try{
            const sql = "UPDATE tipo_p_s SET tipo = :nuevoNombreT where tipo = :anteriorNombreT"

            await sequelize.query(sql,{
                replacements:{anteriorNombreT, nuevoNombreT},
                type: QueryTypes.UPDATE
            })
            console.log("Tipo actualizado ✅")
        }
        catch(error){
            console.error("❌Ha ocurrido un error al actualizar el tipo")
            await controlErrores(error)
        }
    }
    else{
        console.error("❌Actualmente no hay tipos para actualizar")
    }

    await inquirer.prompt(inquirerConfirmar)
}