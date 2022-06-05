const express = require('express');
const route = express.Router();
const adminController = require('../app/controllers/AdminController');

route.post('/show', adminController.login);
route.get('/login', adminController.index);
route.get('/:id/edit', adminController.edit);
route.get('/notify', adminController.notify);



module.exports = route;