import { Router } from "express";

import { sessionsRoutes } from "./sessions.routes"
import { usersRoutes } from "./users.routes"
import { notesRoutes } from "./notes.routes"
import { sessionsGoogleRoutes } from "./sessionsGoogle.routes"

export const routes = Router()

routes.use("/sessions", sessionsRoutes)
routes.use("/sessions-google", sessionsGoogleRoutes)
routes.use("/users", usersRoutes)
routes.use("/notes", notesRoutes)