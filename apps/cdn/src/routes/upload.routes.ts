import { Router } from 'express';
import { uploadAvatarHandler } from '../handlers/avatarHandler';

const router = Router();
router.post('/avatar', uploadAvatarHandler);
export default router;
