const path = require('path');
const express = require('express')
const { engine } = require('express-handlebars');
const routes = require('./routers/index')
const app = express()
const port = 3000
const db = require('./config/db')

db.connect()

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  
app.use(express.json());


app.engine(
    'hbs',
    engine({
      extname: '.hbs',
    }),
  );
  
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

routes(app)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})