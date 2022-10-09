import db from '../database/connection'
import { DataTypes as type, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

export class StatusOrder extends Model<
  InferAttributes<StatusOrder>,
  InferCreationAttributes<StatusOrder>
> {
   declare id: number
   declare status: string
   declare description: string
   declare createdAt: Date
   declare updatedAt: Date
}

export default StatusOrder.init({
   id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   status: type.CHAR,
   description: type.STRING,
   createdAt: type.DATE,
   updatedAt: type.DATE,
}, {
   sequelize: db,
   tableName: 'orders',
   modelName: 'order'
})