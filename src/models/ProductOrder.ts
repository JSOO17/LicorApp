import db from '../database/connection'
import { DataTypes as type, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

export class ProductOrder extends Model<
  InferAttributes<ProductOrder>,
  InferCreationAttributes<ProductOrder>
> {
   declare id: number
   declare comments: string
   declare unitPrice: number
   declare isActive: Boolean
   declare quantity: number
   declare createdAt: Date
   declare updatedAt: Date
   declare productId: ForeignKey<number>
   declare orderId: ForeignKey<number>
}

export default ProductOrder.init({
   id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   comments: type.STRING(150),
   unitPrice: type.DECIMAL,
   isActive: type.BOOLEAN,
   quantity: type.INTEGER,
   createdAt: type.DATE,
   updatedAt: type.DATE,
   productId: {
      type: type.INTEGER,
      allowNull: false
   },
   orderId: {
      type: type.INTEGER,
      allowNull: false
   }
}, {
   sequelize: db,
   tableName: 'productOrder',
   modelName: 'productOrder'
})