import cors from 'cors';
import express from 'express';
import { resolve } from 'path';
import routes from '../routes';

const web = express();

web.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.ORIGIN : '*',
  }),
);
web.use(express.static(resolve(__dirname, '..', '..', 'public')));
web.use(express.json());
web.use(express.urlencoded({ extended: false }));

web.use(routes);

web.use('*', (_, res) => res.json({ status: 404, message: 'Not Found' }));

export default web;
