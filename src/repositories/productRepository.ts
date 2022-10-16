import { IProductRepository } from "interfaces/IRepository"
import NotFoundError from "../libs/errors/NotFoundError"
import { autoInjectable } from "tsyringe"
import Product from "../models/Product"
import { ProductModel } from "../models/Product"
import { UpdateOptions } from "sequelize"
import Brand from "../models/Brand"

@autoInjectable()
class ProductRepository implements IProductRepository {

   getProducts = async () => {
      const products = await Product.findAll({
         include: [
            {
              model: Brand,
              as: "brand"
            }
         ]})
      
      return products
   }

   getProduct = async (id: number) => {
      const product = await Product.findByPk(id, {
         include: [
            {
              model: Brand,
              as: "brand"
            }
         ]})
      
      return product
   }

   postProduct = async (productModel: ProductModel) => {
      const product = await Product.create(productModel)

      return product
   }

   updateProduct = async (id: number, productModel: ProductModel) => {
      const product = await Product.findByPk(id)

      if(!product){
         throw new NotFoundError("product not found")
      }

      await Product.update(productModel, {
         where: { id: id }
      } as UpdateOptions)
   }

   deleteProduct = async (id: number) => {
      const product = await Product.findByPk(id)

      if(!product){
         new NotFoundError("product not found")
      }

      await Product.destroy({
         where: { id: id }
      })
   }
}

export default ProductRepository