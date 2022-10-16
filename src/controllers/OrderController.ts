import { Router, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import { Order as OrderModel } from "../models/Order";
import { ProductOrder as ProductOrderModel } from "../models/ProductOrder";
import { autoInjectable } from "tsyringe";
import OrderServices from "../services/OrderServices";
import BaseController from "./BaseController";
import NotFoundError from "../libs/errors/NotFoundError";

@autoInjectable()
class OrderController extends BaseController {
   private orderServices: OrderServices
   

   constructor(orderServices: OrderServices) {
      super(Router())
      this.orderServices = orderServices
   }

   getOrders = async (req: Request, res: Response) => {
      const orders = await this.orderServices.getOrders()

      return res.status(200).json(orders)
   }

   getOrder = async (req: Request, res: Response) => {
      try {
         const id = req.params.id
      
         if(!id){
            return res.status(400).json({ message: "query param id is required" })
         }
         
         const order = await this.orderServices.getOrder(parseInt(id))
      
         if(!order){
            return res.status(404).json({ message: "order not found" })
         }
      
         return res.status(200).json(order)
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

         const orderModel = req.body as OrderModel
         const productsModel = req.body.products as ProductOrderModel[]

         const order = this.orderServices.postOrder(orderModel, productsModel)

         return res.status(200).json({ message: "order was created", model: order })
      } catch (error) {
         return res.status(500).json({ message: "internal error server" })
      }
   }

   updateProduct = async (req: Request, res: Response) => {
      try {
         const id = req.params.id
         const productModel = req.body as OrderModel

         if(!id) return res.status(400).json({ message: "query param id is required" })

         if(!productModel) return res.status(400).json({ message: "rhe product is empty" })
         
         await this.orderServices.updateOrder(parseInt(id), productModel)

         return res.status(200).json()
      } catch (error) {

         if (error instanceof NotFoundError) return res.status(404).json({ message: "product not found" })

         return res.status(500).json({ message: "internal error server" })
      }
   }

   private validationPost: ValidationChain[] = [
      body('total').not().isEmpty().withMessage("the total is required"),
      body('date').not().isEmpty().withMessage("the date is required"),
      body('clientId').not().isEmpty().withMessage("the client is required"),
      body('statusId').not().isEmpty().withMessage("the status is required"),
      body('products').not().isEmpty().withMessage("there must be any product"),
   ]

   public routes = () => {
      this.router.get('/', this.getOrders)
      this.router.get('/:id', this.getOrder)
      this.router.post('/', this.validationPost, this.postProduct)

      return this.router
   }
}

export default OrderController
