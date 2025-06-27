import { inquirerActualizarProducto, inquirerConfirmar } from "../../inquirer_menu.mjs"
import inquirer from "inquirer"
import { mostrar_productos } from "../../traer_datos.mjs"
import { input } from "../../utils.mjs"
import { sequelize } from "../../conexion.mjs"
import { controlErrores } from "../../errores.mjs"
import { QueryTypes } from "sequelize"


export async function actualizar_producto(){
    const campos = []
    const replacements = {}
    const hayProductos = await mostrar_productos()

    if(hayProductos.length <= 0){
        console.error("❌Actualmente no hay productos para actualizar")
        return
    }

    const productos = await inquirer.prompt(inquirerActualizarProducto[0])
    console.log(productos.nombreProducto)

    const opcionesActualizar = inquirerActualizarProducto.filter(p => 
            ["confirmarPrecio","confirmarDescripcion","confirmarStock"].includes(p.name))
    const seleccion = await inquirer.prompt(opcionesActualizar)
            

    if(seleccion.confirmarPrecio){
        const {nuevoPrecio} = await inquirer.prompt(inquirerActualizarProducto.filter(p => 
                ["nuevoPrecio"].includes(p.name)))

        if(nuevoPrecio == ""){
        await input("❌No deben quedar campos vacios, presione Enter para regresar al menu...")
        return
        }

        if(Number(nuevoPrecio) < 0){
            await input("❌No deben existir precios negativos, presione Enter para regresar al menu...")
            return
        }

        campos.push("precio = :precio")
        replacements.precio = nuevoPrecio
    }
    if(seleccion.confirmarDescripcion){
        const {nuevaDescripcion} = await inquirer.prompt(inquirerActualizarProducto.filter(p => 
                ["nuevaDescripcion"].includes(p.name)))

        campos.push("descripcion = :descripcion")
        replacements.descripcion = nuevaDescripcion
    }

    if(seleccion.confirmarStock){
        const {nuevoStock} = await inquirer.prompt(inquirerActualizarProducto.filter(p => 
                ["nuevoStock"].includes(p.name)))
        

        if(Number(nuevoStock) < 0){
        await input("❌No pueden existir cantidades negativas...")
        return
    }

        campos.push("stock = :stock")
        replacements.stock = nuevoStock
    }

    if(campos.length === 0){
        console.log("No se han insertado campos, regresando al menu...")
        return
    }

    replacements.nombreP = productos.nombreProducto
    const sql = `UPDATE productos_servicios SET ${campos.join(",")} where nombre = :nombreP`

    try{

        await sequelize.query(sql,{
            replacements,
            type: QueryTypes.UPDATE
        })
        console.log("Producto actualizado.")
    }
    catch(error){
        console.error("❌Ha ocurrido un error al actualizar el producto")
        await controlErrores(error)
    }
    
    await inquirer.prompt(inquirerConfirmar)
}