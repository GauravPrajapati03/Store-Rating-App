import express from 'express';
import { isAdmin, verifyToken } from '../middleware/auth.js'
import { addStore, getStoreDetails, getStores } from '../controllers/storeController.js';

const router = express.Router();

router.post('/', verifyToken, isAdmin, addStore);
router.get('/', verifyToken, getStores);
router.get('/:id', verifyToken, getStoreDetails);

export default router;