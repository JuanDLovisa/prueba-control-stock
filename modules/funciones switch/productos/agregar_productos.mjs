import { inquirerCrearProducto, inquirerConfirmar } from "../../inquirer_menu.mjs"
import inquirer from "inquirer"
import { mostrar_tipos } from "../../traer_datos.mjs"
import { input } from "../../utils.mjs"
import { sequelize } from "../../conexion.mjs"
import { controlErrores } from "../../errores.mjs"
import { QueryTypes } from "sequelize"

export async function agregar_productos(){

    const hayTipos = await mostrar_tipos()

    if(hayTipos.length > 0){
        const crearProducto = await inquirer.prompt(inquirerCrearProducto)

        const nombreP = crearProducto.nombreProducto
        const precio = crearProducto.precioProducto
        const descripcion = crearProducto.descripcionProducto
        const idTipo = crearProducto.idTipo

        if(nombreP == "" || precio == ""){
            await input("❌No deben quedar campos vacios, presione Enter para regresar al menu...")
            return
        }
        if(Number(precio) < 0){
            await input("❌No deben existir precios negativos, presione Enter para regresar al menu...")
            return
        }

        try {
            const sql = `INSERT INTO productos_servicios (nombre, precio, descripcion, id_tipo) 
                        VALUES (:nombreP, :precio, :descripcion, :idTipo)`;

            await sequelize.query(sql, {
            replacements: { nombreP, precio, descripcion, idTipo},
            type: QueryTypes.INSERT
            });

            console.log(`${nombreP} insertado correctamente ✅`);
        } catch (error) {
            console.error("❌Ha ocurrido un error al agregar el producto")
            await controlErrores(error)
        }
    }
    else{
        console.error("❌Antes de ingresar un producto debe existir algun tipo de producto")
    }

    await inquirer.prompt(inquirerConfirmar)
}