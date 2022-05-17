const express = require('express');
const route = express.Router();
const loginController = require('../app/controllers/LoginController');


route.get('/', loginController.index);
route.post('/', loginController.login);


module.exports = route;