import { inquirerCrearProducto, inquirerConfirmar } from "../../otros/inquirer_menu.mjs"
import inquirer from "inquirer"
import { mostrar_tipos } from "../../otros/traer_datos.mjs"
import { sequelize } from "../../conexion.mjs"
import { controlErrores } from "../../otros/errores.mjs"
import { QueryTypes } from "sequelize"
import {sleep} from "../../otros/tiempo.mjs"

export async function agregar_productos(){

    const hayTipos = await mostrar_tipos()

    if(hayTipos.length > 0){
        const {nombreProducto, precioProducto, descripcionProducto, idTipo} = await inquirer.prompt(inquirerCrearProducto)
        const replacements = {nombreProducto, precioProducto, descripcionProducto, idTipo}

        if(isNaN(precioProducto)){
            await sleep(500)
            console.error("❌Se han ingresado datos erroneos.")
            await sleep(300)
            await inquirer.prompt(inquirerConfirmar)
            return
        }

        if(nombreProducto == "" || precioProducto == ""){
            await sleep(500)
            console.error("❌No deben quedar campos vacios.")
            await sleep(300)
            await inquirer.prompt(inquirerConfirmar)
            return
        }
        if(Number(precioProducto) < 0){
            await sleep(500)
            console.error("❌No deben existir precios negativos.")
            await sleep(300)
            await inquirer.prompt(inquirerConfirmar)
            return
        }

        try {
            const sql = `INSERT INTO productos_servicios (nombre, precio, descripcion, id_tipo) 
                        VALUES (:nombreProducto, :precioProducto, :descripcionProducto, :idTipo)`;

            await sequelize.query(sql, {
            replacements: replacements,
            type: QueryTypes.INSERT
            });
            await sleep(500)
            console.log(`${nombreProducto} insertado correctamente ✅`);
        } catch (error) {
            await sleep(500)
            console.error("❌Ha ocurrido un error al agregar el producto")
            await controlErrores(error)
        }
    }
    else{
        console.error("❌Antes de ingresar un producto debe existir algun tipo de producto")
    }
    await sleep(300)
    await inquirer.prompt(inquirerConfirmar)
}