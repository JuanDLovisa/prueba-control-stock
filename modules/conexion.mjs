import {Sequelize} from "sequelize"

export const sequelize = new Sequelize('control_stock', 'root', '123456789', { 
  dialect: 'mysql',
  logging:false
});
