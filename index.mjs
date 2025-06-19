import inquirer from 'inquirer'
import {sequelize} from "./modules/conexion.mjs"
import {crearBase} from "./modules/crear_base.mjs"
import {inquirerOpciones} from "./modules/inquirer_menu.mjs"
import {salir, agregar_productos, agregar_tipo, actualizar_producto, actualizar_tipo,
        borrar_producto, borrar_tipo, listar_productos} from "./modules/funciones_switch.mjs"

await crearBase(sequelize);

async function main(){

    while(true){
        const opcion = await inquirer.prompt(inquirerOpciones)

        switch(opcion.menu){
            case "Salir": await salir()
            break;

            case "Agregar producto": await agregar_productos(); 
            break;
            
            case "Agregar tipo de producto": await agregar_tipo(); 
            break;
            
            case "Actualizar producto": await actualizar_producto(); 
            break;

            case "Actualizar tipo": await actualizar_tipo();
            break;

            case "Borrar producto": await borrar_producto(); 
            break;

            case "Borrar tipo": await borrar_tipo();
            break;

            case "Listar productos": await listar_productos();
            break;
        }
    }
}

main().catch((err) => {
  console.error('Ocurrió un error inesperado:', err);
  rl.close();
  sequelize.close();
  process.exit(1);
});