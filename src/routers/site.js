const express = require('express');
const route = express.Router();
const siteController = require('../app/controllers/SiteController');

route.get('/contact', siteController.contact);
route.get('/introduce/group', siteController.introduceGroup);
route.get('/introduce/chairman', siteController.chairman);
route.get('/introduce/BQT', siteController.BQT);
route.get('/introduce', siteController.introduce);
route.get('/detailNew', siteController.detailNew);
route.get('/recruit', siteController.recruit);
route.get('/document', siteController.document);
route.get('/news', siteController.news);
route.get('/', siteController.index);


module.exports = route;