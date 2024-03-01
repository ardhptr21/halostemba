import { Router } from 'express';
import { uploadAvatarHandler } from '../handlers/avatarHandler';
import { uploadMediaHandler } from '../handlers/mediaHandler';
import { uploadIdCardHandler } from '../handlers/idCardHandler';

const router = Router();
router.post('/avatar', uploadAvatarHandler);
router.post('/media', uploadMediaHandler);
router.post('/card', uploadIdCardHandler);
export default router;
