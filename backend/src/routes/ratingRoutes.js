import express from 'express';
import { isOwner, verifyToken } from '../middleware/auth.js';
import { addOrUpdateRating, getRatingsForStoreOwner, getUserRatingForStore } from '../controllers/ratingController';
const router = express.Router();


router.post('/', verifyToken, addOrUpdateRating);
router.get('/my/:storeId', verifyToken, getUserRatingForStore);
router.get('/owner/store', verifyToken, isOwner, getRatingsForStoreOwner);


export default router;