import express from 'express';
import { createUser, getAllUsers, getUserById } from '../controllers/userController.js';

const router = express.Router();

router.post('/user', createUser);
router.get('/user', getAllUsers);
router.get('/user/:id', getUserById);

export default {
  routes: router
};
