import { UnableToWriteFile } from '@flystorage/file-storage';
import { RequestHandler } from 'express';
import { UploadedFile } from 'express-fileupload';
import { nanoid } from 'nanoid';
import sharp from 'sharp';
import { storage } from '../lib/storage';
import Validator from '../lib/validator';

const mediaValidator = new Validator({
  mimes: [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/quicktime',
    'video/x-matroska',
  ],
  extensions: [
    'jpg',
    'jpeg',
    'png',
    'webp',
    'jfif',
    'gif',
    'mp4',
    'mov',
    'webm',
    'mkv',
  ],
  maxSize: 100,
});

export const uploadMediaHandler: RequestHandler = async (req, res) => {
  const media = req.files?.media as UploadedFile | undefined;

  if (!media)
    return res.status(400).json({ status: 400, message: 'No media uploaded.' });

  const validate = mediaValidator.validate(media);

  if (!validate.valid)
    return res.status(400).json({
      status: 400,
      message: 'Upload media failed.',
      error: validate.error,
    });

  try {
    let filename = nanoid(32);

    let buffer: Buffer;

    if (media.mimetype.includes('image') && !media.mimetype.includes('gif')) {
      const imageBuffer = await sharp(media.data)
        .webp({ quality: 80 })
        .toBuffer({ resolveWithObject: true });
      filename += '.webp';
      buffer = imageBuffer.data;
    } else {
      filename += `.${media.name.split('.').pop()}`;
      buffer = media.data;
    }

    const path = `/media/${filename}`;
    await storage.write(path, buffer);

    return res.json({
      status: 201,
      message: 'Media uploaded successfully.',
      url: new URL(path, process.env.APP_URL).toString(),
    });
  } catch (error) {
    console.log(error);
    if (error instanceof UnableToWriteFile) {
      return res.status(500).json({
        status: 500,
        message: 'Upload media failed.',
        error: 'Unable to write file.',
      });
    }

    return res.status(500).json({
      status: 500,
      message: 'Upload media failed.',
      error: 'Unknown error.',
    });
  }
};
