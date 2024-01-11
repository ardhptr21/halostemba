import { FileStorage } from '@flystorage/file-storage';
import { LocalStorageAdapter } from '@flystorage/local-fs';
import { resolve } from 'path';

const publicDirectory = resolve('./public');

const local = new LocalStorageAdapter(publicDirectory);
export const storage = new FileStorage(local);
