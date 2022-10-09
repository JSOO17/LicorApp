import Brand from "./Brand"
import Product from "./Product"

Brand.hasOne(Product, {
   foreignKey: 'brandId',
   sourceKey: 'id',
   as: 'products'
})
 
Product.belongsTo(Brand, { 
   as: 'brand',
   foreignKey: 'brandId'
})
