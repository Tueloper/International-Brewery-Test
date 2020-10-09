import { Router } from 'express';
import { AuthMiddleware } from '../middlewares';
import { AuthController } from '../controllers';

const router = Router();
const {
  verifySignup,
  verifyUser,
  verifyLogin,
  authenticate,
  verifyPasswordReset,
  checkUsername,
} = AuthMiddleware;
const {
  signup,
  login,
  resetPassword,
  resetPasswordEmailLink,
  verifyResetPasswordLink,
  setPassword,
  logoutUser,
  updateUsername
} = AuthController;


router.post('/signup', verifySignup, signup);
router.post('/login', verifyLogin, login);
router.post('/username', authenticate, checkUsername, updateUsername);
router.post('/reset-password', authenticate, verifyUser, verifyPasswordReset, resetPassword);
router.post('/reset-password/email', verifyPasswordReset, resetPasswordEmailLink);
router.get('/reset-password/email', verifyResetPasswordLink);
router.post('/set-password', authenticate, verifyUser, verifyPasswordReset, setPassword);
router.post('/logout', authenticate, logoutUser);

export default router;
