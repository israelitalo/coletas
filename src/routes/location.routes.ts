import { Router } from "express";
import LocationController from "../controllers/LocationController";
import multer from 'multer';
import multerConfig from '../config/multer';

const locationRouter = Router();

const locationController = new LocationController();

const upload = multer(multerConfig);

locationRouter.get('/', locationController.index);
locationRouter.post('/', locationController.create);
locationRouter.put('/:id', upload.single('image'), locationController.update);

export default locationRouter;