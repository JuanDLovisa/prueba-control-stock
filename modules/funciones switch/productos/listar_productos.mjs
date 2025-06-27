import { inquirerConfirmar } from "../../inquirer_menu.mjs"
import inquirer from "inquirer"
import { sequelize } from "../../conexion.mjs"
import { controlErrores } from "../../errores.mjs"
import Table from "cli-table3"

function nueva_tabla(){
    const tabla = new Table({
                        head:["Nombre","Tipo","Precio","Descripcion","Stock"],
                        colWidths:[25,20,20,35,10],
                        colAligns:["center","center","center","center","center"],
                        style:{
                            head:["green"],
                            border:["grey"],
                            compact:false
                        }
                    });
    return tabla
}

export async function listar_productos(){
    try{
        const sql = `select p.nombre, p.precio, p.descripcion, p.stock, t.tipo from productos_servicios as p join tipo_p_s as t 
                    where t.id = p.id_tipo order by t.id`;
        const productos = await sequelize.query(sql);

        const listaProductos = productos[0];
        if(listaProductos.length > 0){
            const tabla = nueva_tabla()
            listaProductos.forEach(p =>{
                tabla.push([p.nombre, p.tipo, `$${p.precio.toFixed(2)}`, p.descripcion, p.stock]);
            })

            console.log(tabla.toString())  
        }
        else{
            console.error("❌No hay productos para mostrar")
        }
         
    }
    catch (error){
        console.error("❌Ha ocurrido un error al listar productos")
        await controlErrores(error)
    }
    await inquirer.prompt(inquirerConfirmar)
}