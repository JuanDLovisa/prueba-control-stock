import inquirer from 'inquirer'
import  {sequelize } from "./modules/conexion.mjs"
import { crearBase } from "./modules/crear_base.mjs"
import { inquirerOpciones } from "./modules/otros/inquirer_menu.mjs"
import { salir } from './modules/funciones switch/salir.mjs'

import { agregar_productos } from './modules/funciones switch/productos/agregar_productos.mjs'
import { actualizar_producto } from './modules/funciones switch/productos/actualizar_productos.mjs'
import { borrar_producto } from './modules/funciones switch/productos/borrar_productos.mjs'
import { listar_productos } from "./modules/funciones switch/productos/listar_productos.mjs"

import { agregar_tipo } from './modules/funciones switch/tipos/agregar_tipos.mjs'
import { actualizar_tipo } from './modules/funciones switch/tipos/actualizar_tipos.mjs'
import { borrar_tipo } from './modules/funciones switch/tipos/borrar_tipos.mjs'

await crearBase(sequelize);

async function main(){

    while(true){
        const opcion = await inquirer.prompt(inquirerOpciones)

        switch(opcion.menu){
            case "Salir": await salir()
            console.clear()
            break;

            case "Agregar producto": await agregar_productos();
            console.clear() 
            break;
            
            case "Agregar tipo de producto": await agregar_tipo();
            console.clear() 
            break;
            
            case "Actualizar producto": await actualizar_producto();
            console.clear() 
            break;

            case "Actualizar tipo": await actualizar_tipo();
            console.clear()
            break;

            case "Borrar producto": await borrar_producto();
            console.clear() 
            break;

            case "Borrar tipo": await borrar_tipo();
            console.clear()
            break;

            case "Listar productos": await listar_productos();
            console.clear()
            break;
        }
    }
}

main().catch((err) => {
  console.error('❌Ocurrió un error inesperado:', err);
  rl.close();
  sequelize.close();
  process.exit(1);
});