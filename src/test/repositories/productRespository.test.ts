import "reflect-metadata"
import ProductRepository from "../../repositories/ProductRepository"
import { ProductModel } from "../../models/Product"

describe('tests product services', () => {
   it('get products successfull', async () => {
      const productsMock = [
         {
            id: 212,
            name: "product 1",
            description: "description product",
            price: 123.3
         }
      ]

      const mockFindAll = jest.fn((): Promise<ProductModel[]> => new Promise(() => productsMock as ProductModel[]))

      jest
      .spyOn(ProductModel, 'findAll')
      .mockImplementation(() => mockFindAll())

      const productRepository = new ProductRepository()

      const products = await productRepository.getProducts()
      
      expect(products[0].name).toEqual("product 1")
      expect(products[0].description).toEqual("description product")
      expect(products[0].price).toEqual(123.3)
      expect(products.length).toEqual(1)
   })
})