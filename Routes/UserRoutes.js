import express from 'express';
const router=express.Router();
import userController from '../Controllers/userController.js';
import checkUserAuth from '../Middleware/auth_middleware.js';
//Route level middleware to protect route:-
router.use('/changepassword',checkUserAuth);
//public routes:-
router.post('/register',userController.userRegistration)
router.post('/login',userController.userLogin)
//protocted routes:--
router.post('/changepassword',userController.changeUserPassword)
export default router;
