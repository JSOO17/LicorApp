import db from '../database/connection'
import { DataTypes as type, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

export class ProductModel extends Model<
  InferAttributes<ProductModel>,
  InferCreationAttributes<ProductModel>
> {
   declare id: number
   declare name: string
   declare description: string
   declare price: number
   declare createdAt: Date
   declare updatedAt: Date
   declare brandId: ForeignKey<number>
}

export default ProductModel.init({
   id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: type.STRING,
   description: type.STRING,
   price: type.DECIMAL,
   createdAt: type.DATE,
   updatedAt: type.DATE,
   brandId: {
      type: type.INTEGER,
      allowNull: false
   }
}, {
   sequelize: db,
   tableName: 'products',
   modelName: 'product'
})