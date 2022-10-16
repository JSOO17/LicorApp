import ProductRepository from "../repositories/ProductRepository";
import { autoInjectable } from "tsyringe"
import { ProductModel } from "../models/Product"

@autoInjectable()
class ProductServices {

   private productRepository: ProductRepository;

   constructor(productRepository: ProductRepository) {
      this.productRepository = productRepository
   }

   getProducts = async (): Promise<ProductModel[]> => {
      const products = await this.productRepository.getProducts()
      
      return products
   }

   getProduct = async (id: number): Promise<ProductModel | null> => {
      const product = await this.productRepository.getProduct(id)
      
      return product
   }

   postProduct = async (productModel: ProductModel): Promise<ProductModel | null> => {
      const product = await this.productRepository.postProduct(productModel)
      
      return product
   }

   updateProduct = async (id: number, productModel: ProductModel) => {
      await this.productRepository.updateProduct(id, productModel)
   }

   deleteProduct = async (id: number) => {
      await this.productRepository.deleteProduct(id)
   }
}

export default ProductServices