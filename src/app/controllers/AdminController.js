const {Admin,BQT,News,Researchs,Contact,Document,Group,Chairman} = require('./models/admin')
const { mongoosetoOject, mutipleMongooseToOject} = require('../../until/mongoose');

class AdminController{
    index(req,res,next){
        res.render('admin/login',{
            layout: 'LoginAdmin'
        }
        )

    }

    show(req,res,next){
        const object = {}
        News.countDocuments({ type: 'news' }, function (err, count) {
            object.news = count         
        });
        BQT.countDocuments({ type: 'BQT' }, function (err, count) {
            object.bqt = count         
        });
        Researchs.countDocuments({ type: 'research' }, function (err, count) {
            object.research = count         
        });
        Document.countDocuments({ type: 'document' }, function (err, count) {
            object.document = count         
        });
        Contact.countDocuments({ type: 'contact' }, function (err, count) {
            object.contact = count         
        });
        Group.countDocuments({ type: 'group' }, function (err, count) {
            object.group = count         
        });
        Chairman.countDocuments({ type: 'chairman' }, function (err, count) {
            object.chairman = count         
        });
        res.render('admin/homeAdmin',{
            layout: 'admin',
            object,
        })
    }

    login(req,res,next){
        Admin.findOne({
            user: req.body.user,
            password: req.body.password,
        })
            .then(admin => {
                if(admin){
                    res.render('admin/homeAdmin',{
                        layout: 'admin'
                    })
                }else{
                    res.render('admin/login',{
                        layout: 'LoginAdmin'
                    })
                }
            })
            .catch(err => {
                res.status(500).json("co lỗi server")
            })
    }
    //Notify
    BQT(req,res,next){
        BQT.find({})
            .then(bqt => {res.render('admin/BQT',{
                layout: 'admin',
                bqt: mutipleMongooseToOject(bqt)
            })})
        
    }

    createBQT(req,res,next){
        res.render('admin/createBQT',{
            layout: 'admin'
        }
        )
    }
    

    storeBQT(req, res, next) {
        const fromData = req.body;
        fromData.type = "BQT"
        const bqt = new BQT(fromData);
        bqt.save()
          .then(() => res.redirect('/admin/BQT'))
          .catch(error => {
    
          })
      }

    editBQT(req,res,next){
        BQT.findById(req.params.id)
            .then(bqt => res.render('admin/editBQT',{
                layout: 'admin',
                bqt: mongoosetoOject(bqt)
            }))       
    }

    updateBQT(req, res, next) {
        BQT.updateOne({_id: req.params.id}, req.body)
          .then(() => res.redirect('/admin/BQT'))
          .catch(next)
      }

    deleteBQT(req, res, next) {
        BQT.deleteOne({_id: req.params.id})
          .then(() => res.redirect('back'))
          .catch(next)
      }

      // news
    news(req,res,next){
        News.find({})
            .then(news => {res.render('admin/news',{
                layout: 'admin',
                news: mutipleMongooseToOject(news)
            })})
        
    }

    createNew(req,res,next){
        res.render('admin/createNew',{
            layout: 'admin'
        }
        )
    }
    

    storeNew(req, res, next) {
        const fromData = req.body;
        fromData.type = "news"
        const news = new News(fromData);
        news.save()
          .then(() => res.redirect('/admin/news'))
          .catch(error => {
    
          })
      }

    editNew(req,res,next){
        News.findById(req.params.id)
            .then(news => res.render('admin/editNew',{
                layout: 'admin',
                news: mongoosetoOject(news)
            }))       
    }

    updateNew(req, res, next) {
        News.updateOne({_id: req.params.id}, req.body)
          .then(() => res.redirect('/admin/news'))
          .catch(next)
      }

    deleteNew(req, res, next) {
        News.deleteOne({_id: req.params.id})
          .then(() => res.redirect('back'))
          .catch(next)
      }

      //reseach
    research(req,res,next){
        Researchs.find({})
            .then(researchs => {res.render('admin/research',{
                layout: 'admin',
                researchs: mutipleMongooseToOject(researchs)
            })})
        
    }

    createResearch(req,res,next){
        res.render('admin/createResearch',{
            layout: 'admin'
        }
        )
    }
    

    storeResearch(req, res, next) {
        const fromData = req.body;
        fromData.type = "research"
        const reseachs = new Researchs(fromData);
        reseachs.save()
          .then(() => res.redirect('/admin/research'))
          .catch(error => {
    
          })
      }

    editResearch(req,res,next){
        Researchs.findById(req.params.id)
            .then(researchs => res.render('admin/editResearch',{
                layout: 'admin',
                researchs: mongoosetoOject(researchs)
            }))       
    }

    updateResearch(req, res, next) {
        Researchs.updateOne({_id: req.params.id}, req.body)
          .then(() => res.redirect('/admin/research'))
          .catch(next)
      }

    deleteResearch(req, res, next) {
        Researchs.deleteOne({_id: req.params.id})
          .then(() => res.redirect('back'))
          .catch(next)
      }
    

    //Research'
    contact(req,res,next){
        Contact.find({})
            .then(contact => {res.render('admin/contact',{
                layout: 'admin',
                contact: mutipleMongooseToOject(contact)
            })})
        
    }

    createContact(req,res,next){
        res.render('admin/createContact',{
            layout: 'admin'
        }
        )
    }
    

    storeContact(req, res, next) {
        const fromData = req.body;
        fromData.type = "contact"
        const contact = new Contact(fromData);
        contact.save()
          .then(() => res.redirect('/admin/contact'))
          .catch(error => {
    
          })
      }

    editContact(req,res,next){
        Contact.findById(req.params.id)
            .then(contact => res.render('admin/editContact',{
                layout: 'admin',
                contact: mongoosetoOject(contact)
            }))       
    }

    updateContact(req, res, next) {
        Contact.updateOne({_id: req.params.id}, req.body)
          .then(() => res.redirect('/admin/contact'))
          .catch(next)
      }

    deleteContact(req, res, next) {
        Contact.deleteOne({_id: req.params.id})
          .then(() => res.redirect('back'))
          .catch(next)
      }

    //document
    document(req,res,next){
        Document.find({})
            .then(document => {res.render('admin/document',{
                layout: 'admin',
                document: mutipleMongooseToOject(document)
            })})
        
    }

    createDocument(req,res,next){
        res.render('admin/createDocument',{
            layout: 'admin'
        }
        )
    }
    

    storeDocument(req, res, next) {
        const fromData = req.body;
        fromData.type = "document"
        const document = new Document(fromData);
        document.save()
          .then(() => res.redirect('/admin/Document'))
          .catch(error => {
    
          })
      }

    editDocument(req,res,next){
        Document.findById(req.params.id)
            .then(document => res.render('admin/editDocument',{
                layout: 'admin',
                document: mongoosetoOject(document)
            }))       
    }

    updateDocument(req, res, next) {
        Document.updateOne({_id: req.params.id}, req.body)
          .then(() => res.redirect('/admin/document'))
          .catch(next)
      }

    deleteDocument(req, res, next) {
        Document.deleteOne({_id: req.params.id})
          .then(() => res.redirect('back'))
          .catch(next)
      }
    

    //group
    group(req,res,next){
        Group.find({})
            .then(group => {res.render('admin/group',{
                layout: 'admin',
                group: mutipleMongooseToOject(group)
            })})
        
    }

    createGroup(req,res,next){
        res.render('admin/createGroup',{
            layout: 'admin'
        }
        )
    }
    

    storeGroup(req, res, next) {
        const fromData = req.body;
        fromData.type = "group"
        const group = new Group(fromData);
        group.save()
          .then(() => res.redirect('/admin/group'))
          .catch(error => {
    
          })
      }

    editGroup(req,res,next){
        Group.findById(req.params.id)
            .then(group => res.render('admin/editGroup',{
                layout: 'admin',
                group: mongoosetoOject(group)
            }))       
    }

    updateGroup(req, res, next) {
        Group.updateOne({_id: req.params.id}, req.body)
          .then(() => res.redirect('/admin/group'))
          .catch(next)
      }

    deleteGroup(req, res, next) {
        Group.deleteOne({_id: req.params.id})
          .then(() => res.redirect('back'))
          .catch(next)
      }

    //group
    Chairman(req,res,next){
        Chairman.find({})
            .then(chairman => {res.render('admin/chairman',{
                layout: 'admin',
                chairman: mutipleMongooseToOject(chairman)
            })})
        
    }

    createChairman(req,res,next){
        res.render('admin/createChairman',{
            layout: 'admin'
        }
        )
    }
    

    storeChairman(req, res, next) {
        const fromData = req.body;
        fromData.type = "chairman"
        const chairman = new Chairman(fromData);
        chairman.save()
          .then(() => res.redirect('/admin/chairman'))
          .catch(error => {
    
          })
      }

    editChairman(req,res,next){
        Chairman.findById(req.params.id)
            .then(chairman => res.render('admin/editChairman',{
                layout: 'admin',
                chairman: mongoosetoOject(chairman)
            }))       
    }

    updateChairman(req, res, next) {
        Chairman.updateOne({_id: req.params.id}, req.body)
          .then(() => res.redirect('/admin/chairman'))
          .catch(next)
      }

    deleteChairman(req, res, next) {
        Chairman.deleteOne({_id: req.params.id})
          .then(() => res.redirect('back'))
          .catch(next)
      }
}

module.exports = new AdminController();