import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { getRoles, addRol } from '../controllers/rol.controller.js';

const router = Router();

// Solo admin puede gestionar roles
router.use(authenticate, authorize(['admin']));

router.get('/', getRoles);
router.post('/', addRol);

export default router;