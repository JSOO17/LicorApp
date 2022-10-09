import Product from "models/Product";

export interface IProductRepository {
   getProducts: () => Promise<any>
}