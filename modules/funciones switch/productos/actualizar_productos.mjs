import { inquirerActualizarProducto, inquirerConfirmar } from "../../otros/inquirer_menu.mjs"
import inquirer from "inquirer"
import { mostrar_productos } from "../../otros/traer_datos.mjs"
import { sequelize } from "../../conexion.mjs"
import { controlErrores } from "../../otros/errores.mjs"
import { QueryTypes } from "sequelize"
import {sleep} from "../../otros/tiempo.mjs"


export async function actualizar_producto(){
    const campos = []
    const replacements = {}
    await sleep(500)
    const hayProductos = await mostrar_productos()

    if(hayProductos.length <= 0){
        await sleep(500)
        console.error("❌Actualmente no hay productos para actualizar")
        return
    }

    const productos = await inquirer.prompt(inquirerActualizarProducto[0])

    const opcionesActualizar = inquirerActualizarProducto.filter(p => 
            ["confirmarPrecio","confirmarDescripcion","confirmarStock"].includes(p.name))
    const {confirmarPrecio, confirmarDescripcion, confirmarStock} = await inquirer.prompt(opcionesActualizar)
            

    if(confirmarPrecio){
        const {nuevoPrecio} = await inquirer.prompt(inquirerActualizarProducto.filter(p => 
                ["nuevoPrecio"].includes(p.name)))

        if(isNaN(nuevoPrecio) === true){
            await sleep(500)
            console.error("❌Se ha ingresado un tipo de dato erroneo")
            await sleep(300)
            await inquirer.prompt(inquirerConfirmar)
            return
        }

        if(nuevoPrecio == ""){
        await sleep(500)
        console.error("❌No deben quedar campos vacios, presione Enter para regresar al menu...")
        await sleep(300)
        await inquirer.prompt(inquirerConfirmar)
        return
        }

        if(Number(nuevoPrecio) < 0){
            await sleep(500)
            console.error("❌No deben existir precios negativos.")
            await sleep(300)
            await inquirer.prompt(inquirerConfirmar)
            return
        }

        campos.push("precio = :precio")
        replacements.precio = nuevoPrecio
    }
    if(confirmarDescripcion){
        const {nuevaDescripcion} = await inquirer.prompt(inquirerActualizarProducto.filter(p => 
                ["nuevaDescripcion"].includes(p.name)))

        campos.push("descripcion = :descripcion")
        replacements.descripcion = nuevaDescripcion
    }

    if(confirmarStock){
        const {nuevoStock} = await inquirer.prompt(inquirerActualizarProducto.filter(p => 
                ["nuevoStock"].includes(p.name)))
        

        if(Number(nuevoStock) < 0){
        await sleep(500)
        console.error("❌No pueden existir cantidades negativas...")
        await sleep(300)
        await inquirer.prompt(inquirerConfirmar)
        return
    }

        campos.push("stock = :stock")
        replacements.stock = nuevoStock
    }

    if(campos.length === 0){
        await sleep(500)
        console.log("No se han insertado campos.")
        await sleep(300)
        await inquirer.prompt(inquirerConfirmar)
        return
    }

    replacements.nombreProducto = productos.nombreProducto
    const sql = `UPDATE productos_servicios SET ${campos.join(",")} where nombre = :nombreProducto`

    try{
        await sequelize.query(sql,{
            replacements,
            type: QueryTypes.UPDATE
        })
        await sleep(500)
        console.log("Producto actualizado.")
    }
    catch(error){
        await sleep(300)
        console.error("❌Ha ocurrido un error al actualizar el producto")
        await controlErrores(error)
    }
    await sleep(300)
    await inquirer.prompt(inquirerConfirmar)
}