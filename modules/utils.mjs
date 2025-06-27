import readline from 'readline'
import {sequelize} from "./conexion.mjs"
export function input (texto) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout

    })
    return new Promise(resolve => {
        rl.question(texto, (res) => {
            resolve(res)
            rl.close()
        })
    })
    
}

export async function query(stmt, option){
const result = await sequelize.query(stmt, option)
await sequelize.close()
return result
}