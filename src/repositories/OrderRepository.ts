import Order, { Order as OrderModel } from "../models/Order"
import ProductOrder, { ProductOrder as ProductOrderModel } from "../models/ProductOrder"
import { StatusOrder } from "../models/StatusOrder"
import { autoInjectable } from "tsyringe"
import NotFoundError from "../libs/errors/NotFoundError"
import db from '../database/connection'
import { Transaction, UpdateOptions } from "sequelize"
import Product from "../models/Product"


@autoInjectable()
class OrderRepository {
   getOrders = async () => {
      const orders = await Order.findAll({
         include: [
            {
               model: StatusOrder,
               as: 'status'
            },
            {
               model: Product,
               as: 'products'
            }
         ]
      })

      return orders
   }

   getOrder = async (id: number) => {
      const order = await Order.findByPk(id, {
         include: [
            {
               model: StatusOrder,
               as: 'status'
            },
            {
               model: Product,
               as: 'products'
            }
         ]
      })

      return order
   }

   postOrder = async (orderModel: OrderModel, productsModel: ProductOrderModel[]) => {
      const transaction = await db.transaction()

      try {
         const order = await Order.create(orderModel, { transaction })

         const products = await this.asocciateProducts(order.id, productsModel, transaction)

         transaction.commit()

         return {
            order, 
            products
         }
      } catch (error) {
         transaction.rollback()
      }
      
   }

   updateOrder = async (id: number, orderModel: OrderModel) => {
      const product = await Order.findByPk(id)

      if(!product){
         throw new NotFoundError("product not found")
      }

      await Order.update(orderModel, {
         where: { id: id }
      } as UpdateOptions)
   }

   deleteOrder = async (id: number) => {
      const order = await Order.findByPk(id)

      if(!order){
         new NotFoundError("product not found")
      }

      await Order.destroy({
         where: { id: id }
      })
   }

   private asocciateProducts = async (orderId: number, productsModel: ProductOrderModel[], transaction: Transaction) => {
      
      productsModel.forEach(product =>{
         product.orderId = orderId
      })

      const products = await ProductOrder.bulkCreate(productsModel, { transaction })

      return products
   }
}

export default OrderRepository