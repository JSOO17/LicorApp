import db from '../database/connection'
import { DataTypes as type, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
   declare id: number
   declare total: number
   declare dateDelivered: Date
   declare date: Date
   declare comment: string
   declare address: string
   declare createdAt: Date
   declare updatedAt: Date
   declare clientId: ForeignKey<number>
   declare statusId: ForeignKey<number>
}

export default Order.init({
   id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   total: type.DECIMAL,
   dateDelivered: type.DATE,
   date: type.DATE,
   createdAt: type.DATE,
   updatedAt: type.DATE,
   comment: type.STRING(150),
   address: type.STRING(100),
   clientId: {
      type: type.INTEGER,
      allowNull: false
   },
   statusId: {
      type: type.INTEGER,
      allowNull: false
   }
}, {
   sequelize: db,
   tableName: 'orders',
   modelName: 'order'
})