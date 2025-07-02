import Table from "cli-table3"

export const tablaProductos = new Table({
            head:["Nombre","Tipo","Precio","Descripcion","Stock"],
            colWidths:[25,20,20,35,10],
            colAligns:["center","center","center","center","center"],
            style:{
                head:["green"],
                border:["grey"],
                compact:false
            }
        });

export const tablaTipos = new Table({
    head:["Tipos actuales"],
    colWidths:[25],
    colAligns:["center"],
    style:{
            head:["green"],
            border:["grey"],
            compact:true
        }
    });