import express from 'express';
import { descargarBackup } from '../controllers/backup.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, authorize(['admin']), descargarBackup);

export default router;
