import mysql from 'mysql2/promise';
import inquirer from 'inquirer';

const inquirerCrearBase = [
    {
        type:"input",
        name:"nombreUsuario",
        message:" ---> Para crear la base de datos ingrese el usuario (si no ingresa nada se usara root) <---"
    },
    {
        type:"input",
        name:"contraUsuario",
        message:" ---> Ingrese la contraseña <---"
    }
]
async function initDatabase() {
  const usuario = await inquirer.prompt(inquirerCrearBase)

  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: usuario.nombreUsuario,
      password: usuario.contraUsuario,
    });

    await conn.query("CREATE DATABASE IF NOT EXISTS control_stock");
    console.log("✅ Base de datos 'control_stock' creada o ya existente.");
    await conn.end();

  } catch (err) {
    console.error("❌ Error al inicializar la base de datos:", err.message);
  }
}

initDatabase();