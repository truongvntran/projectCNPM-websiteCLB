const {Admin, Notify} = require('./models/admin')
const { mongoosetoOject, mutipleMongooseToOject} = require('../../until/mongoose');

class AdminController{
    index(req,res,next){
        res.render('admin/login',{
            layout: 'LoginAdmin'
        }
        )
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
    notify(req,res,next){
        Notify.find({})
            .then(notify => {res.render('admin/notify',{
                layout: 'admin',
                notify: mutipleMongooseToOject(notify)
            })})
        
    }
    edit(req,res,next){
        Notify.findById(req.params.id)
            .then(notify => res.render('admin/edit',{
                layout: 'admin',
                notify: mongoosetoOject(notify)
            }))       
    }
}

module.exports = new AdminController();