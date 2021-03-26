//Create the Database Connection
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3002;
const helpers=require('./__test__/utilis/helpers')

const sequelize = require('./config/connection');
// const Sequelize  = require('sequelize/types');
const session = require('express-session');

const hbs = exphbs.create({helpers});
const SequelizeStore=require('connect-session-sequelize')(session.Store);
const sess={
    secret:'canyouguessmysecret',
     cookie:{},
     resave:false,
     saveUninitialized:true,
     store:new SequelizeStore({
         db:sequelize
     })
    
}
app.use(session(sess))
app.engine('handlebars',hbs.engine);
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'))


//turn on routes
// app.use(routes)
// app.use(express.static(path.join(__dirname,'public')))


//turn on connection to db and server
//force:true similar as DROP TABLE IF EXISTS
sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,()=>console.log(`running on port ${PORT}`)) 
})


// MVC is a popular software-design pattern that organizes your app into the three following separate concerns:

// Models: the core data of your app

// Views: the UI components, such as your HTML layouts

// Controllers: the link between your models and views

// At a high-level, middleware is just a function that executes before the function that sends the response back.
