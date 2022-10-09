import express, { Application, json } from 'express'
import { container } from 'tsyringe'
import ProductController from './controllers/ProductController'
import db from './database/connection'
import './models/index'
import morgan from 'morgan'

class Server {
   public app: Application
   private port: string

   constructor(){
      this.app = express()
      this.port = process.env.PORT || '5000'
      this.connectDatabase()
      this.listen()
      this.middlewares()
      this.routes()
   }

   public listen() {
      this.app.listen(this.port, () => {
         console.log(`running server. port ${this.port} `)
      })
   }

   private injectControllers() {
      const productController = container.resolve(ProductController)
      this.app.use('/api/product', productController.routes())
   }

   private routes() {
      this.injectControllers()
   }

   private middlewares() {
      this.app.use(json())
      this.app.use(morgan('dev'))
   }

   private async connectDatabase() {
      try {
        await db.authenticate();
      } catch (error: any) {
        console.log(`Database connection error: ${error.message}`)
      }
   }
}

export default Server