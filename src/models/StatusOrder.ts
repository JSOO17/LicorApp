import db from '../database/connection'
import { DataTypes as type, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

export class StatusOrder extends Model<
  InferAttributes<StatusOrder>,
  InferCreationAttributes<StatusOrder>
> {
   declare id: number
   declare name: string
   declare description: string
}

export default StatusOrder.init({
   id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: type.CHAR,
   description: type.STRING,
}, {
   sequelize: db,
   tableName: 'statusOrder',
   modelName: 'status',
   timestamps: false
})