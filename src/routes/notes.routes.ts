import { Router } from "express";
import { NotesController } from '../controllers/NotesController'
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
export const notesRoutes = Router()

const notesController = new NotesController()

notesRoutes.post('/', ensureAuthenticated, notesController.create)
notesRoutes.get('/', ensureAuthenticated, notesController.index)
notesRoutes.get('/:id', ensureAuthenticated, notesController.show)
notesRoutes.delete('/:id', ensureAuthenticated, notesController.delete)
