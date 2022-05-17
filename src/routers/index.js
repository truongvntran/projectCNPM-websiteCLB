const siteRouter = require('./site');
const loginRouter = require('./login');

function routes(app){
    app.use('/login',loginRouter)
    app.use('/',siteRouter)
}

module.exports = routes;
