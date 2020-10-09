import { Router } from 'express';
import { AuthMiddleware } from '../middlewares';
import { AuthController } from '../controllers';

const router = Router();
const {
  verifySignup,
  verifyLogin,
  authenticate,
  verifyPasswordReset,
  // checkUsername,
} = AuthMiddleware;
const {
  signup,
  login,
  resetPassword,
  logoutUser,
  // updateUsername
} = AuthController;


router.post('/signup', verifySignup, signup);
router.post('/login', verifyLogin, login);
router.post('/reset-password', authenticate, verifyPasswordReset, resetPassword);
router.post('/logout', authenticate, logoutUser);

export default router;
