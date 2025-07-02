import { inquirerBorrarProducto, inquirerConfirmar } from "../../otros/inquirer_menu.mjs"
import inquirer from "inquirer"
import { mostrar_productos } from "../../otros/traer_datos.mjs"
import { sequelize } from "../../conexion.mjs"
import { controlErrores } from "../../otros/errores.mjs"
import { QueryTypes } from "sequelize"
import {sleep} from "../../otros/tiempo.mjs"

export async function borrar_producto(){
    await sleep(500)
    const hayProductos = await mostrar_productos()
    if(hayProductos.length > 0){
        const borrarProducto = await inquirer.prompt(inquirerBorrarProducto)
        const nombreProducto = borrarProducto.nombreProducto

        try{
            const sql = "DELETE from productos_servicios where nombre = :nombreProducto"

            await sequelize.query(sql,{
                replacements:{nombreProducto},
                type: QueryTypes.DELETE
            })
            await sleep(500)
            console.log(`${nombreProducto} fue eliminado correctamente ✅`)
        }
        catch(error){
            await sleep(500)
            console.error("❌Ha ocurrido un error al borrar el producto")
            await controlErrores(error)
        }
        await sleep(500)
        await inquirer.prompt(inquirerConfirmar)
    }
    else{
        await sleep(500)
        console.error("❌Actualmente no existen productos para borrar")
        await inquirer.prompt(inquirerConfirmar)
    }
    await sleep(500)
}