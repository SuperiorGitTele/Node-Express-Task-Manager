import {Router} from 'express'
import { loginUser, registerUser, logout, requestPasswordReset, resetPassword } from '../controllers/auth.controller.js';
import {  checkToken, refreshToken } from '../middleware/jwtUtils.js'
const router = Router()

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.get('/check-token', checkToken);

export default router;
