import { Result, ValidationError } from "express-validator"

export default class BaseController {
   protected buildErrors = (errors: Result<ValidationError>) => {
      let errorMessages: string[] = []

      errors.array().forEach(error => {
         errorMessages.push(error.msg)
      })

      return errorMessages
   }
}