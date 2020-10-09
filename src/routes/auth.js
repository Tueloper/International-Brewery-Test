import { Router } from 'express';
import { AuthMiddleware, UserMiddleware } from '../middlewares';
import { AuthController, UserController } from '../controllers';

const router = Router();
const {
  verifySignup,
  verifyLogin,
  authenticate,
  verifyPasswordReset,
} = AuthMiddleware;
const {
  verifyProfileUpdate,
} = UserMiddleware;
const {
  signup,
  login,
  resetPassword,
  logoutUser,
} = AuthController;
const {
  updateProfile,
  getProfile,
} = UserController;


router.post('/signup', verifySignup, signup);
router.post('/login', verifyLogin, login);
router.post('/reset-password', authenticate, verifyPasswordReset, resetPassword);
router.post('/logout', authenticate, logoutUser);
router.put('/profile', verifyProfileUpdate, updateProfile);
router.get('/profile', authenticate, getProfile);

export default router;
