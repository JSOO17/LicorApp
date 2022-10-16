import Brand from "./Brand"
import Order from "./Order"
import Product from "./Product"
import ProductOrder from "./ProductOrder"
import StatusOrder from "./StatusOrder"

export default () => {
   Brand.hasOne(Product, {
      foreignKey: 'brandId',
      sourceKey: 'id',
      as: 'products'
   })
    
   Product.belongsTo(Brand, { 
      as: 'brand',
      foreignKey: 'brandId'
   })

   StatusOrder.hasOne(Order, {
      foreignKey: 'statusId',
      sourceKey: 'id',
      as: 'orders'
   })

   Order.belongsTo(StatusOrder, {
      as: 'status',
      foreignKey: 'statusId'
   })

   Order.belongsToMany(Product, { 
      through: ProductOrder,
      as: 'products'
   })
   
   Product.belongsToMany(Order, { 
      through: ProductOrder,
      as: 'products'
   })
}