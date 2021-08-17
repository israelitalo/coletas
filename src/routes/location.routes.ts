import { Router } from "express";
import LocationController from "../controllers/LocationController";
import multer from 'multer';
import multerConfig from '../config/multer';
import multerValidade from "../middlewares/multerValidade";

const locationRouter = Router();

const locationController = new LocationController();

const upload = multer(multerConfig);

locationRouter.get('/', locationController.index);
locationRouter.post('/', locationController.create);
locationRouter.put('/:id', multerValidade, upload.single('image'), locationController.update);

export default locationRouter;