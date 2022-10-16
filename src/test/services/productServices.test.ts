import ProductServices from "../../services/ProductServices"
import ProductRepository from "repositories/ProductRepository"
import * as sinon from "ts-sinon"
import { ProductModel } from "../../models/Product"

jest.useRealTimers()

describe('tests product services', () => {
   it('get products successfull', async () => {

      const stubRepository = sinon.stubInterface<ProductRepository>()
      
      stubRepository.getProducts.returns(new Promise(() => {
         return [
            {
               id: 212,
               name: "product 1",
               description: "description product",
               price: 123.3
            }
         ] as ProductModel[]
      }))

      const productServices = new ProductServices(stubRepository)

      const products = await productServices.getProducts()

      expect(products[0].name).toEqual("product 1")
      expect(products[0].description).toEqual("description product")
      expect(products[0].price).toEqual(123.3)
      expect(products.length).toEqual(1)
   })
})