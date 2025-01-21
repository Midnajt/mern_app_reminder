import { Router } from 'express';
const router = Router();
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';

router.get('/current-ser', getCurrentUser);
router.get('/admin/app-stats', getApplicationStats);
router.patch('/update-user', validateUpdateUserInput, updateUser);

export default router;
