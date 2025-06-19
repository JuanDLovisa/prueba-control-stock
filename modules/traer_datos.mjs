import { sequelize } from "./conexion.mjs"
import {tablaTipos} from "./tables.mjs"

export async function mostrar_tipos(){
    try{
        const sql = "SELECT id,tipo from tipo_p_s"
        const tipos = await sequelize.query(sql);
        
        return tipos[0]
    }
    catch (error){
        console.log("Se ha producido un error al obtener los datos de tipo" + error)
    }
}

export async function mostrar_tipos_tabla(){
    try{
        const sql = "SELECT tipo from tipo_p_s"
        const tipos = await sequelize.query(sql);
        
        const listaTipos = tipos[0]
        const tabla = tablaTipos
        tabla.length = 0

        listaTipos.forEach(t => {
            tabla.push([t.tipo])
        })
        console.log(tabla.toString())
    }
    catch (error){
        console.log("Se ha producido un error al obtener los datos de tipo" + error)
    }
}

export async function mostrar_productos(){
    try{
        const sql = "SELECT id, nombre, precio, descripcion, stock FROM productos_servicios"
        const productos = await sequelize.query(sql);

        return productos[0]
    }
    catch (error){
        console.log("Se ha producido un error al obtener los datos de producto" + error)
    }
}