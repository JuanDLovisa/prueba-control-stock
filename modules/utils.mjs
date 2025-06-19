import {Sequelize} from 'sequelize'
import readline from 'readline'
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
  const sequelize = new Sequelize('control_stock', 'root', '123456789', {
  dialect: 'mysql',
  logging:false
    })
const result = await sequelize.query(stmt, option)
await sequelize.close()
return result
}