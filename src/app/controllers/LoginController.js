const Admin = require('./models/admin')
const { mongoosetoOject } = require('../../until/mongoose');

class LoginController{
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
                    res.render('home')
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
}

module.exports = new LoginController();