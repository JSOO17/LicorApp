import { Sequelize, Options } from 'sequelize'

const options: Options = {
   database: process.env.DB_NAME || 'licorapp',
   username: process.env.DB_USERNAME || 'root',
   password: process.env.DB_PASSWORD || 'admin',
   dialect: 'mysql',
   host: process.env.DB_HOST || 'localhost',
   port: 3306,
   pool: {
    max: 100,
    min: 0,
    idle: 200000,
    acquire: 1000000,
  }
 }

const sequelize = new Sequelize(options)

export default sequelize
