const express = require('express');
const route = express.Router();
const adminController = require('../app/controllers/AdminController');


//chairman
route.get('/createChairman', adminController.createChairman);
route.post('/storeChairman', adminController.storeChairman);
route.put('/:id/updateChairman', adminController.updateChairman);
route.get('/:id/editChairman', adminController.editChairman);
route.delete('/:id/deleteChairman', adminController.deleteChairman);
route.get('/Chairman', adminController.Chairman);

//BQT
route.get('/createBQT', adminController.createBQT);
route.post('/storeBQT', adminController.storeBQT);
route.put('/:id/updateBQT', adminController.updateBQT);
route.get('/:id/editBQT', adminController.editBQT);
route.delete('/:id/deleteBQT', adminController.deleteBQT);
route.get('/BQT', adminController.BQT);


//news
route.get('/news', adminController.news);
route.get('/createNew', adminController.createNew);
route.post('/storeNew', adminController.storeNew);
route.put('/:id/updateNew', adminController.updateNew);
route.get('/:id/editNew', adminController.editNew);
route.delete('/:id/deleteNew', adminController.deleteNew);

//research
route.get('/research', adminController.research);
route.get('/createResearch', adminController.createResearch);
route.post('/storeResearch', adminController.storeResearch);
route.put('/:id/updateResearch', adminController.updateResearch);
route.get('/:id/editResearch', adminController.editResearch);
route.delete('/:id/deleteResearch', adminController.deleteResearch);


//contact
route.get('/contact', adminController.contact);
route.get('/createContact', adminController.createContact);
route.post('/storeContact', adminController.storeContact);
route.put('/:id/updateContact', adminController.updateContact);
route.get('/:id/editContact', adminController.editContact);
route.delete('/:id/deleteContact', adminController.deleteContact);


//document
route.get('/document', adminController.document);
route.get('/createDocument', adminController.createDocument);
route.post('/storeDocument', adminController.storeDocument);
route.put('/:id/updateDocument', adminController.updateDocument);
route.get('/:id/editDocument', adminController.editDocument);
route.delete('/:id/deleteDocument', adminController.deleteDocument);


//group
route.get('/group', adminController.group);
route.get('/createGroup', adminController.createGroup);
route.post('/storeGroup', adminController.storeGroup);
route.put('/:id/updateGroup', adminController.updateGroup);
route.get('/:id/editGroup', adminController.editGroup);
route.delete('/:id/deleteGroup', adminController.deleteGroup);



//login
route.get('/login', adminController.index);
route.post('/', adminController.login);

//homepage
route.get('/', adminController.show);





module.exports = route;