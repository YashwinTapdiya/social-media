const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie and authentication passport
const session = require('express-session');
const passport =require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assests'));
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);


//set up the view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');
 
// Mongo Store is used to store the session cookie in the database
app.use(session({
    name: 'InstaBook' ,
    //TODO change the secret before deployment in production mode
    secret: 'blahsomethin',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (100*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || "connect-mongoDB setup OK");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/' , require('./routes'));

app.listen(port , function(err){
    if(err){
        //console.log('Error' , err);
        //interpolation method
        console.log(`Error in running the server : ${err}`)
    }
    console.log(`Server is running on port : ${port}`);
})