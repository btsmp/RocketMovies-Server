import "express-async-errors";
import express, { Response, Request, NextFunction } from 'express'
import cors from "cors"
import { routes } from './routes'
import { AppError } from './utils/AppError'
import { UPLOADS_FOLDER } from './config/upload'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/files', express.static(UPLOADS_FOLDER))
app.use(routes)

app.use((error: any, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "Error",
      message: error.message
    })
  }

  console.log(error)

  return response.status(500).json({
    status: "Error",
    message: "Internal Server Error"
  })
})

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))