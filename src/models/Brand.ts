import db from '../database/connection'
import { DataTypes as type, InferAttributes, InferCreationAttributes, Model, ModelAttributeColumnOptions, ModelAttributes } from 'sequelize'
import ProductModel, { Product } from './Product'


export class Brand extends Model<
  InferAttributes<Brand>,
  InferCreationAttributes<Brand>
> {
   declare id: number
   declare name: string;

   declare createdAt: Date;
   declare updatedAt: Date;
}

export default Brand.init({
   id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: type.STRING,
   createdAt: type.DATE,
   updatedAt: type.DATE
}, {
   sequelize: db,
   tableName: 'brands',
   modelName: 'brand'
})