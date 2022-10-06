import { Router } from "express";
import { SessionsGoogleController } from "../controllers/SessionsGoogleController"

export const sessionsGoogleRoutes = Router()

const sessionsGoogleController = new SessionsGoogleController

sessionsGoogleRoutes.post('/', sessionsGoogleController.create)
