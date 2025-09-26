import express from 'express';

const router = express.Router();

// admin
router.post('/', protect, isAdmin, createsStoreByAdmin);
router.get('/dashboard-stats', protect, isAdmin, getDashboardStats);

// store
router.get('/my-store', protect, getStoreOwnerDashboard);

router.get('/', protect, getAllStores);


router.post('/store-Id/ratings', protect, submitOrUpdateRating);

export default router;