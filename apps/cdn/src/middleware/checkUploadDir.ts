import { NextFunction } from 'express';
import fs from 'node:fs';
import path from 'path';

export default function checkUploadDir(dir: string) {
  return (_: unknown, __: unknown, next: NextFunction) => {
    if (!fs.existsSync(path.join(__dirname, `../../public`, dir))) {
      fs.mkdirSync(path.join(__dirname, `../../public`, dir));
    }
    next();
  };
}
