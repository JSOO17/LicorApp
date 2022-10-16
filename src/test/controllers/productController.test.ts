
import request from "supertest"
import ProductServices from "../../services/ProductServices"
import Product, { ProductModel } from "../../models/Product"
import { Request, Response } from "express"
import Server from '../../server'
import sinon from "ts-sinon"
import ProductController from "../../controllers/ProductController"

describe('tests product controller', () => {

   let status, json, res: Response, productServices;
    beforeEach(() => {
      status = sinon.stub()
      json = sinon.spy()
      status.returns(res)
    });


   it('get products successfull', async () => {

      const req = { body: { } } as Request;

      const productService = sinon.createStubInstance(ProductServices)

      const mockGetProducts = async () => {
         return [
            {
               id: 212,
               name: "product 1",
               description: "description product",
               price: 123.3
            }
         ] as ProductModel[]
      }

      productService.getProducts.returns(mockGetProducts())

      const productController = new ProductController(productService as unknown as ProductServices)

      const result = await productController.getProducts(req, res as Response)

      expect(result.json.name).toEqual("product 1")
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

      const result = await request(server.app).get("api/products/212").send()
      
      expect(result.body[0].name).toEqual("product 1")
      expect(result.statusCode).toEqual(200)
   })
})