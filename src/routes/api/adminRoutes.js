import express from 'express';
import {addAdmin} from '../../controllers/api/adminController';

const adminRouter = express.Router();

adminRouter.post('/addAdmin', addAdmin);

export default adminRouter;
