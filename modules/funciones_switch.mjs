import {inquirerSalir, inquirerCrearProducto, inquirerCrearTipo, inquirerActualizarProducto, 
        inquirerActualizarTipo, inquirerBorrarProducto, inquirerBorrarTipo,
        inquirerConfirmar} from "./inquirer_menu.mjs"
import inquirer from 'inquirer'
import { QueryTypes } from 'sequelize'
import {input} from "./utils.mjs"
import {sequelize} from "./conexion.mjs"
import { tablaProductos } from "./tables.mjs"
import { mostrar_tipos_tabla } from "./traer_datos.mjs"
import { controlErrores } from "./errores.mjs"

export async function salir(){
    const salir = await inquirer.prompt(inquirerSalir)

    if(salir.salir === true){
        console.log("Saliendo del programa... presione enter")
        await input("")
        await sequelize.close();
        process.exit(0);
    }
    await inquirer.prompt(inquirerConfirmar)
}

export async function agregar_productos(){
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
    await inquirer.prompt(inquirerConfirmar)
}

export async function agregar_tipo(){
    await mostrar_tipos_tabla()
    const crearTipo = await inquirer.prompt(inquirerCrearTipo)
    const nombreT = crearTipo.nombreTipo
    
    if(nombreT == ""){
        await input("❌No deben quedar campos vacios, presione Enter para regresar al menu...")
        return
    }

    try {
    const sql = `INSERT INTO tipo_p_s (tipo) VALUES (:nombreT)`;

    await sequelize.query(sql, {
    replacements: {nombreT},
    type: QueryTypes.INSERT
    });

    console.log(`Tipo de producto: ${nombreT} insertado correctamente ✅`);
    } catch (error) {
        console.error("❌Ha ocurrido un error al agregar el tipo")
        await controlErrores(error)
    }
    await inquirer.prompt(inquirerConfirmar)
}

export async function actualizar_producto(){
    const actualizarProducto = await inquirer.prompt(inquirerActualizarProducto)
    const nombreP = actualizarProducto.nombreProducto
    const nuevoPrecio = actualizarProducto.precioProducto

    if(nuevoPrecio == ""){
        await input("❌No deben quedar campos vacios, presione Enter para regresar al menu...")
        return
    }

    if(Number(nuevoPrecio) < 0){
        await input("❌No deben existir precios negativos, presione Enter para regresar al menu...")
        return
    }

    try{
        const sql = "UPDATE productos_servicios SET precio = :nuevoPrecio where nombre = :nombreP"

        await sequelize.query(sql,{
            replacements:{nombreP, nuevoPrecio},
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

export async function actualizar_tipo(){
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
    await inquirer.prompt(inquirerConfirmar)
}

export async function borrar_producto(){
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

export async function borrar_tipo(){
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
    await inquirer.prompt(inquirerConfirmar)
}

export async function listar_productos(){
    try{
        const sql = `select p.nombre, p.precio, p.descripcion, p.stock, t.tipo from productos_servicios as p join tipo_p_s as t 
                    where t.id = p.id_tipo order by t.id`;
        const productos = await sequelize.query(sql);

        const listaProductos = productos[0];
        const tabla = tablaProductos

        listaProductos.forEach(p =>{
            tabla.push([p.nombre, p.tipo, `$${p.precio.toFixed(2)}`, p.descripcion, p.stock]);
        })

        console.log(tabla.toString())   
    }
    catch (error){
        console.error("❌Ha ocurrido un error al listar productos")
        await controlErrores(error)
    }
    await inquirer.prompt(inquirerConfirmar)
}