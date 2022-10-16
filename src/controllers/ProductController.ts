import { Router, Request, Response } from "express"
import { ProductModel  } from "../models/Product"
import { autoInjectable } from "tsyringe"
import ProductServices from '../services/ProductServices'
import NotFoundError from "../libs/errors/NotFoundError"
import { body, validationResult } from "express-validator"
import { ValidationChain } from "express-validator/src/chain"
import BaseController from "./BaseController"

@autoInjectable()
export default class ProductController extends BaseController {
   private productServices: ProductServices

   constructor(productServices: ProductServices) {
      super(Router())
      this.productServices = productServices
   }
   
   getProducts = async (req: Request, res: Response) => {
      try {
         const products = await this.productServices.getProducts()

         return res.status(200).json(products)
      } catch (error) {
         return res.status(500).json({ message: "internal error server" })
      }
   }

   getProduct = async (req: Request, res: Response) => {
      try {
         const id = req.params.id

         if(!id){
            return res.status(400).json({ message: "query param id is required" })
         }
         
         const product = await this.productServices.getProduct(parseInt(id))

         if(!product){
            return res.status(404).json({ message: "product not found" })
         }

         return res.status(200).json(product)
      } catch (error) {
         return res.status(500).json({ message: "internal error server" })
      }
   }

   postProduct = async (req: Request, res: Response) => {

      try {
         const errors = validationResult(req)

         if(!errors.isEmpty()){
            let errorMessages: string[] = this.buildErrors(errors)
   
            return res.status(400).json({ 
               message: "required fields are not valid or are missing",
               errors: errorMessages
            })
         }
   
         const productModel = req.body as ProductModel
   
         const product = this.productServices.postProduct(productModel)
   
         return res.status(200).json({ message: "product was created", model: product })
      } catch (error) {
         return res.status(500).json({ message: "internal error server" })
      }
   }
   
   updateProduct = async (req: Request, res: Response) => {
      try {
         const id = req.params.id
         const productModel = req.body as ProductModel

         if(!id) return res.status(400).json({ message: "query param id is required" })

         if(!productModel) return res.status(400).json({ message: "rhe product is empty" })
         
         await this.productServices.updateProduct(parseInt(id), productModel)

         return res.status(200).json()
      } catch (error) {

         if (error instanceof NotFoundError) return res.status(404).json({ message: "product not found" })

         return res.status(500).json({ message: "internal error server" })
      }
   }

   deleteProduct = async (req: Request, res: Response) => {
      try {
         const id = req.params.id

         if(!id) return res.status(400).json({ message: "query param id is required" })
         
         await this.productServices.deleteProduct(parseInt(id))

         return res.status(200).json()
      } catch (error) {

         if (error instanceof NotFoundError) return res.status(404).json({ message: "product not found" })

         return res.status(500).json({ message: "internal error server" })
      }
   }

   private validationPost: ValidationChain[] = [
      body('name').not().isEmpty().withMessage("the name is required"),
      body('description').not().isEmpty().withMessage("the description is required"),
      body('price').not().isEmpty().withMessage("the price is required"),
     //body('price').not().isNumeric().withMessage("the price must be a numeric")
   ]

   public routes = () => {
      this.router.get('/', this.getProducts)
      this.router.get('/:id', this.getProduct)
      this.router.post('/', this.validationPost, this.postProduct)
      this.router.put('/:id', this.updateProduct)
      this.router.delete('/:id', this.deleteProduct)

      return this.router
   }
}