import express from 'express';
import { isAdmin, verifyToken } from '../middleware/auth.js';
import { addUser, getDashboardStats, getUserDetails, getUsers, updateUserPassword } from '../controllers/userController.js';


const router = express.Router();


router.post('/', verifyToken, isAdmin, addUser);
router.get('/', verifyToken, isAdmin, getUsers);
router.get('/:id', verifyToken, isAdmin, getUserDetails);
router.get('/dashboard/stats', verifyToken, isAdmin, getDashboardStats);
router.put('/:id/password', verifyToken, updateUserPassword)


export default router;