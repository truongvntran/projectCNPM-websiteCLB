const siteRouter = require('./site');
const loginRouter = require('./admin');



function routes(app){
    app.use('/admin',loginRouter)
    app.use('/homepage',siteRouter)
}

module.exports = routes;
