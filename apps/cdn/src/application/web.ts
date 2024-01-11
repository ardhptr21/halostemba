import express from 'express';
import fileUpload from 'express-fileupload';
import { resolve } from 'path';
import routes from '../routes';
import cors from 'cors';

const web = express();

web.use(cors());
web.use(express.static(resolve(__dirname, '..', '..', 'public')));
web.use(express.json());
web.use(express.urlencoded({ extended: false }));
web.use(
  fileUpload({
    debug: process.env.NODE_ENV !== 'production',
  }),
);

web.use(routes);

web.use('*', (_, res) => res.json({ status: 404, message: 'Not Found' }));

export default web;
