import { Router } from "express";
import { UsersController } from './../controllers/UsersController';
import { UsersAvatarController } from './../controllers/UserAvatarController';
import { ensureAuthenticated } from './../middlewares/ensureAuthenticated';

import { MULTER } from "../config/upload";
import multer from "multer";

export const usersRoutes = Router()

const upload = multer(MULTER)

const usersController = new UsersController()
const usersAvatarController = new UsersAvatarController()

usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), usersAvatarController.update)
usersRoutes.post('/', usersController.create)