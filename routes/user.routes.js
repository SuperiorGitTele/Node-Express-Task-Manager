import { Router } from 'express';
const router = Router();
import { getAllUsers, getUserById, updateUser, deleteUser} from '../controllers/user.controller.js';

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
