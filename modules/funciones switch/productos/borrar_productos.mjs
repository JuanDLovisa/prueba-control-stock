import { inquirerBorrarProducto, inquirerConfirmar } from "../../inquirer_menu.mjs"
import inquirer from "inquirer"
import { mostrar_productos } from "../../traer_datos.mjs"
import { sequelize } from "../../conexion.mjs"
import { controlErrores } from "../../errores.mjs"
import { QueryTypes } from "sequelize"

export async function borrar_producto(){
    const hayProductos = await mostrar_productos()
    if(hayProductos.length > 0){
        const borrarProducto = await inquirer.prompt(inquirerBorrarProducto)
        const nombreP = borrarProducto.nombreProducto

        try{
            const sql = "DELETE from productos_servicios where nombre = :nombreP"

            await sequelize.query(sql,{
                replacements:{nombreP},
                type: QueryTypes.DELETE
            })
            console.log(`${nombreP} fue eliminado correctamente ✅`)
        }
        catch(error){
            console.error("❌Ha ocurrido un error al borrar el producto")
            await controlErrores(error)
        }
        await inquirer.prompt(inquirerConfirmar)
    }
    else{
        console.error("❌Actualmente no existen productos para borrar")
        await inquirer.prompt(inquirerConfirmar)
    }
}