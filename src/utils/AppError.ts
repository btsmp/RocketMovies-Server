export class AppError {
  message
  statusCode

  constructor(message: any, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}