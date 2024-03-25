import { UnableToWriteFile } from '@flystorage/file-storage';
import { RequestHandler } from 'express';
import { UploadedFile } from 'express-fileupload';
import { storage } from '../lib/storage';
import Validator from '../lib/validator';
import { nanoid } from 'nanoid';
import sharp from 'sharp';

const idCardValidator = new Validator({
  mimes: ['image/jpg', 'image/jpeg', 'image/png'],
  extensions: ['jpg', 'jpeg', 'png'],
  maxSize: 5,
});

export const uploadIdCardHandler: RequestHandler = async (req, res) => {
  const card = req.files?.card as UploadedFile | undefined;

  if (!card)
    return res.status(400).json({ status: 400, message: 'No card uploaded.' });

  const validate = idCardValidator.validate(card);

  if (!validate.valid)
    return res.status(400).json({
      status: 400,
      message: 'Upload card failed.',
      error: validate.error,
    });

  try {
    const imageBuffer = await sharp(card.data)
      .resize(640, 360, { fit: 'cover' })
      .webp({ quality: 100 })
      .toBuffer({ resolveWithObject: true });

    const filename = `${nanoid(32)}.webp`;
    const path = `/card/${filename}`;
    await storage.write(path, imageBuffer.data);

    return res.json({
      status: 201,
      message: 'card uploaded successfully.',
      url: new URL(path, process.env.APP_URL).toString(),
    });
  } catch (error) {
    if (error instanceof UnableToWriteFile) {
      return res.status(500).json({
        status: 500,
        message: 'Upload card failed.',
        error: 'Unable to write file.',
      });
    }

    return res.status(500).json({
      status: 500,
      message: 'Upload card failed.',
      error: 'Unknown error.',
    });
  }
};
