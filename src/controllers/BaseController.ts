import { Router } from "express"
import { Result, ValidationError } from "express-validator"

export default class BaseController {
   protected router: Router

   constructor(router: Router) {
      this.router = router
   }
   
   protected buildErrors = (errors: Result<ValidationError>) => {
      let errorMessages: string[] = []

      errors.array().forEach(error => {
         errorMessages.push(error.msg)
      })

      return errorMessages
   }
}