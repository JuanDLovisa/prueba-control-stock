import { mostrar_productos, mostrar_tipos } from "./traer_datos.mjs"

export const inquirerOpciones={
        type:"list",
        name:"menu",
        message:"---> Ingrese una operacion <---",
        choices:["Salir", "Agregar producto", "Agregar tipo de producto", "Actualizar producto", "Actualizar tipo",
            "Borrar producto", "Borrar tipo", "Listar productos"]
    }


export const inquirerSalir = {
        type:"confirm",
        name:"salir",
        message:"Seguro que desea salir? --->"
    }

export const inquirerConfirmar = {
        type:"input",
        name:"confirmar",
        message:"Regresando al menu, presione enter... "
    }

export const inquirerCrearProducto = [
    {
        type:"input",
        name:"nombreProducto",
        message:"Ingrese el nombre del producto --->"
    },
    {
        type:"input",
        name:"precioProducto",
        message:"Ingrese el precio del producto --->"
    },
    {
        type:"input",
        name:"descripcionProducto",
        message:"Ingrese la descripcion del producto --->"
    },
    {
        type:"list",
        name:"idTipo",
        message:"---> Seleccione el tipo al que el prodcuto pertenece <---",
        choices: async () => {
            const tipos = await mostrar_tipos()
            return tipos.map(tipo=>({
                name:tipo.tipo,
                value:tipo.id
            }));
        }
    }
]

export const inquirerCrearTipo ={
        type:"input",
        name:"nombreTipo",
        message:"Ingrese un tipo de producto que no este en la lista --->"
    }

export const inquirerActualizarProducto = [
    {
        type:"list",
        name:"nombreProducto",
        message:"Ingrese el nombre del producto a actualizar --->",
        choices: async () => {
            const productos = await mostrar_productos()
            return productos.map(producto => ({
                name: producto.nombre,
                value: producto.nombre
            }));
        }
    },
    {
    type:"confirm",
    name:"confirmarPrecio",
    message:"Desea actualizar el precio del producto? --->"
    },
    {
    type:"confirm",
    name:"confirmarDescripcion",
    message:"Desea actualizar la descripcion del producto? --->"
    },
    {
    type:"confirm",
    name:"confirmarStock",
    message:"Desea cambiar el stock del producto? --->"
    },
    {
        type:"input",
        name:"nuevoPrecio",
        message:"Ingrese el nuevo precio --->"
    },
    {
        type:"input",
        name:"nuevaDescripcion",
        message:"Ingrese la nueva descripcion --->"
    },
    {
        type:"input",
        name:"nuevoStock",
        message:"Ingrese el numero de productos en existencia --->"
    }
]

export const inquirerActualizarTipo = [
    {
        type:"list",
        name:"nombreAnterior",
        message:"---> Seleccione el tipo de producto a actualizar <---",
        choices: async () => {
            const tipos = await mostrar_tipos()
            return tipos.map(tipo=>({
                name:tipo.tipo,
                value:tipo.tipo
            }));
        }
    },
    {
        type:"input",
        name:"nombreNuevo",
        message:"Ingrese el nuevo nombre ---> "
    }
]

export const inquirerBorrarProducto = {
    type:"list",
    name:"nombreProducto",
    message:"---> Ingrese el nombre del producto a borrar <---",
    choices: async () => {
            const productos = await mostrar_productos()
            return productos.map(producto => ({
            name: producto.nombre,
            value: producto.nombre
        }));
    }
}


export const inquirerBorrarTipo = {
    type:"list",
    name:"nombreTipo",
    message:"---> Ingrese el nombre del tipo de producto a borrar <---",
    choices: async () => {
        const tipos = await mostrar_tipos();
        return tipos.map((tipo) => ({
            name: tipo.tipo,
            value: tipo.tipo
        }));
    }
}