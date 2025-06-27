import { inquirerBorrarTipo, inquirerConfirmar } from "../../inquirer_menu.mjs"
import inquirer from "inquirer"
import { mostrar_tipos } from "../../traer_datos.mjs"
import { sequelize } from "../../conexion.mjs"
import { controlErrores } from "../../errores.mjs"
import { QueryTypes } from "sequelize"

export async function borrar_tipo(){
    const hayTipos = await mostrar_tipos()

    if(hayTipos.length > 0) {
        const borrarTipo = await inquirer.prompt(inquirerBorrarTipo)
        const nombreT = borrarTipo.nombreTipo

        try{
            const sql = "DELETE from tipo_p_s where tipo = :nombreT"

            await sequelize.query(sql,{
                replacements:{nombreT},
                type: QueryTypes.DELETE
            })
            console.log(`${nombreT} fue eliminado correctamente ✅`)
        }
        catch(error){
            console.error("❌Ha ocurrido un error al borrar el tipo")
            await controlErrores(error)
        }
    }
    else{
        console.error("❌Actualmente no hay tipos para borrar")
    }

    await inquirer.prompt(inquirerConfirmar)
}