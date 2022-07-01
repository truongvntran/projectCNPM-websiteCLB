const path = require('path');
const express = require('express')
const { engine } = require('express-handlebars');
const routes = require('./routers/index')
const methodOverride = require('method-override')
const app = express()
const port = 3000
const db = require('./config/db')

db.connect()

app.use(express.static(path.join(__dirname, 'public')));

  
app.use(express.json());
app.use(methodOverride('_method'))


app.engine(
    'hbs',
    engine({
      extname: '.hbs',
      helpers: {
        sum: (a,b) => a + b
      }
    }),
  );
  
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

routes(app)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})