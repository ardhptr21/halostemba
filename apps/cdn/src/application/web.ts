import express from 'express';

const web = express();

web.use(express.static('public'));
web.use(express.json());
web.use(express.urlencoded({ extended: false }));

web.get('/', (_, res) => res.send('cdn'));

export default web;
