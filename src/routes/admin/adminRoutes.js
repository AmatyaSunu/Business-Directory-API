import express from 'express';
import {
    addAdmin,
    login,
    forgotPassword,
    resetPassword
} from '../../controllers/admin/adminController';

const adminRouter = express.Router();

adminRouter.post('/addAdmin', addAdmin);
adminRouter.post('/login', login);
adminRouter.post('/forgotPassword', forgotPassword);
adminRouter.post('/resetPassword', resetPassword);

export default adminRouter;