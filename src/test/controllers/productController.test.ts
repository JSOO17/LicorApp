
import request from "supertest"
import ProductServices from "../../services/productServices"
import Product, { ProductModel } from '../../models/Product'
import Server from '../../server'

describe('tests product controller', () => {
   it('get products successfull', async () => {
      const products = [
         {
            id: 212,
            name: "product 1",
            description: "description product",
            price: 123.3,
            createdAt: new Date(),
            updatedAt: new Date()
         }
      ]

      const mockFindAll = jest.fn((): Promise<ProductModel[]> => new Promise(() => products as ProductModel[]))

      jest
      .spyOn(Product, 'findAll')
      .mockImplementation(() => mockFindAll())

      var server = new Server()

      const res = await request(server.app).get("api/products").send()
      
      expect(res.body[0].name).toEqual("product 1")
      expect(res.statusCode).toEqual(200)
   })

   it('get a product successfull', async () => {
      const productMock = {
         id: 212,
         name: "product 1",
         description: "description product",
         price: 123.3,
         createdAt: new Date(),
         updatedAt: new Date()
      } as ProductModel

      const mockFindAll = jest.fn((): Promise<ProductModel[]> => new Promise(() => productMock as ProductModel))

      jest
      .spyOn(Product, 'findAll')
      .mockImplementation(() => mockFindAll())

      var server = new Server()

      const res = await request(server.app).get("api/products/212").send()
      
      expect(res.body[0].name).toEqual("product 1")
      expect(res.statusCode).toEqual(200)
   })
})