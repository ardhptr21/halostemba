import { Router } from 'express';
import { uploadAvatarHandler } from '../handlers/avatarHandler';
import { uploadMediaHandler } from '../handlers/mediaHandler';

const router = Router();
router.post('/avatar', uploadAvatarHandler);
router.post('/media', uploadMediaHandler);
export default router;
