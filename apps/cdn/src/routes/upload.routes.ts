import { Router } from 'express';
import fileUpload from 'express-fileupload';
import checkUploadDir from '../middleware/checkUploadDir';
import { uploadAvatarHandler } from '../handlers/avatarHandler';
import { uploadIdCardHandler } from '../handlers/idCardHandler';
import { uploadMediaHandler } from '../handlers/mediaHandler';

const router = Router();
router.use(fileUpload({ debug: process.env.NODE_ENV !== 'production' }));
router.post('/avatar', checkUploadDir('avatar'), uploadAvatarHandler);
router.post('/media', checkUploadDir('media'), uploadMediaHandler);
router.post('/card', checkUploadDir('card'), uploadIdCardHandler);
export default router;
