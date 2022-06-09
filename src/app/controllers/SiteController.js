const {Admin,BQT,News,Researchs,Contact,Document,Group,Chairman} = require('./models/admin')
const { mongoosetoOject, mutipleMongooseToOject} = require('../../until/mongoose');

class SiteController{
    index(req,res,next){
        News.find({})
            .then(news => res.render('homepage/home',{
                news: mutipleMongooseToOject(news)
            }))
    }
    contact(req,res,next){
        Contact.find({})
            .then(contact => res.render('homepage/contact',{
                contact: mutipleMongooseToOject(contact)
            }))
        
    }
    introduce(req,res,next){
        res.render('homepage/introduce')
    }
    introduceGroup(req,res,next){
        Group.find({})
            .then(group => res.render('homepage/group',{
                group: mutipleMongooseToOject(group)
            }
            ))
        
    }
    chairman(req,res,next){
        Chairman.find({})
            .then(chairman => res.render('homepage/chairman',{
                chairman: mutipleMongooseToOject(chairman)
            }))
        
    }
    BQT(req,res,next){
        BQT.find({})
            .then(bqt => res.render('homepage/BQT',{
                bqt: mutipleMongooseToOject(bqt)
            }
            ))
        
    }
    recruit(req,res,next){
        res.render('homepage/recruit')
    }

    document(req,res,next){
        res.render('homepage/document')
    }

    news(req,res,next){
        News.find({})
            .then(news => res.render('homepage/news',{
                news: mutipleMongooseToOject(news)
            }))
        
    }
    detailNew(req,res,next){
        res.render('homepage/detailNew')
    }
}

module.exports = new SiteController();