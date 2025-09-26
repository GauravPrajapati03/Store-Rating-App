import express from 'express';

const router = express.Router();


router.post('/', auth, isAdmin, createUserByAdmin);     // create new user
router.get('/', auth, isAdmin, getAllUsersByAdmin);            // get all users
router.get('/:id', auth, isAdmin, getUserByIdByAdmin);         // get user by id
router.put('/update/:id', auth, isAdmin, updateUserByIdByAdmin);     // update user by id
router.delete('/delete/:id', auth, isAdmin, deleteUserByIdByAdmin);   // delete user by id


export default router;