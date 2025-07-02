import {input} from "./utils.mjs"
import {sleep} from "./otros/tiempo.mjs"

export async function crearBase(sequelize){
    try {
    await sequelize.authenticate();
    console.log('Conectado correctamente ✅');

    let sql = `create table if not exists tipo_p_s(id int not null auto_increment primary key,
									        tipo varchar(30) not null unique);`;
    await sequelize.query(sql);
    sql = `create table if not exists productos_servicios(id int not null auto_increment primary key,
											nombre varchar(30) not null unique,
                                            precio float not null,
                                            descripcion varchar(255),
                                            stock int default 0,
                                            id_tipo int not null,
											creado datetime default now(),
                                            actualizado datetime default now() on update now(),
                                            constraint fk_tipo foreign key(id_tipo) references tipo_p_s(id));`;
    await sequelize.query(sql);
    }
    catch(error){
        console.error("❌Ha ocurrido un error al crear las tablas, verifique su conexion SQL")
        await sleep(300)
        console.log("Saliendo... presione Enter para continuar")
        await input("")
        await sequelize.close();
        process.exit(1);
    }
    await sleep(500)
}