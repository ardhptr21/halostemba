import { UnableToWriteFile } from '@flystorage/file-storage';
import { RequestHandler } from 'express';
import { UploadedFile } from 'express-fileupload';
import { nanoid } from 'nanoid';
import sharp from 'sharp';
import { storage } from '../lib/storage';
import Validator from '../lib/validator';

const avatarValidator = new Validator({
  mimes: ['image/jpg', 'image/jpeg', 'image/png'],
  extensions: ['jpg', 'jpeg', 'png'],
  maxSize: 5,
});

export const uploadAvatarHandler: RequestHandler = async (req, res) => {
  const avatar = req.files?.avatar as UploadedFile | undefined;

  if (!avatar)
    return res
      .status(400)
      .json({ status: 400, message: 'No avatar uploaded.' });

  const validate = avatarValidator.validate(avatar);

  if (!validate.valid)
    return res.status(400).json({
      status: 400,
      message: 'Upload avatar failed.',
      error: validate.error,
    });

  try {
    const imageBuffer = await sharp(avatar.data)
      .resize(250, 250, { fit: 'cover' })
      .webp({ quality: 80 })
      .toBuffer({ resolveWithObject: true });

    const filename = `${nanoid(32)}.webp`;
    const path = `/avatar/${filename}`;
    await storage.write(`/avatar/${filename}`, imageBuffer.data);

    return res.json({
      status: 201,
      message: 'Avatar uploaded successfully.',
      url: new URL(path, process.env.APP_URL).toString(),
    });
  } catch (error) {
    console.error(error);
    if (error instanceof UnableToWriteFile) {
      return res.status(500).json({
        status: 500,
        message: 'Upload avatar failed.',
        error: 'Unable to write file.',
      });
    }

    return res.status(500).json({
      status: 500,
      message: 'Upload avatar failed.',
      error: 'Unknown error.',
    });
  }
};
