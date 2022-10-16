import OrderRepository from "../repositories/OrderRepository"
import { autoInjectable } from "tsyringe"
import { Order as OrderModel } from "../models/Order"
import { ProductOrder as ProductOrderModel } from "models/ProductOrder"

@autoInjectable()
class OrderServices {

   private orderRepository: OrderRepository;

   constructor(orderRepository: OrderRepository) {
      this.orderRepository = orderRepository
   }

   getOrders = async () => {
      return await this.orderRepository.getOrders()
   }

   getOrder = async (id: number) => {
      return await this.orderRepository.getOrder(id)
   }

   postOrder = async (orderModel: OrderModel, productsModel: ProductOrderModel[]) => {
      return await this.orderRepository.postOrder(orderModel, productsModel)
   }

   updateOrder = async (id: number, orderModel: OrderModel) => {
      await this.orderRepository.updateOrder(id, orderModel)
   }
}

export default OrderServices