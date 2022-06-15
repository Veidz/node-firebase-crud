import express from 'express';
import { createUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.post('/user', createUser);
router.get('/user', getAllUsers);

export default {
  routes: router
};
