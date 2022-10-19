const express = require('express');
const router = express.Router();

const controller = require('../controller/img.controller');

const routes = (app) => {
  router.post('/img-upload', controller.uploadFile);
  app.use(router);
};

module.exports = routes;
