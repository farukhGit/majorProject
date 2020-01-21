const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');

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

// use static files
app.use(express.static('./assets'));

// use express layouts
app.use(expressLayouts);

// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


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