const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());  
app.use(cookieParser());

// routes
const indexRoute = require('./routes/index');

app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}))

// set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// use express session
app.use(session({
    name : 'user_cookie',
    secret : 'secret',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store : new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    }, function(err){ console.log(err || 'connect-mongodb setup ok')})
}));

// use static files
app.use(express.static('./assets'));

// use express layouts
app.use(expressLayouts);

// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// direct all requests to indexRoute
app.use('/', indexRoute);  


// connect express to port
app.listen(port, (err)=>{
    if(err){
        console.log('Error listening to port : ', port);
        return;
    }

    return console.log('Listening to port : ', port);
})