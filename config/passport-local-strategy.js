const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user_schema');

passport.use(new LocalStrategy({
    usernameField : 'email'
}, (email, password, done)=>{
    User.findOne({email : email}, (err, user)=>{
        if(err){
            console.log('Error finding user - passport');
            return done(err);
        }
        if(!user || user.password != password){
            console.log('Invalid username or password');
            return done(null, false);
        }

        return done(null, user);
    })
}));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error finding user - passport.');
            done(err);
        }

        return done(null, user);
    });
});

passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function ('controller action')
    if(req.isAuthenticated()){
        console.log('User is authenticated.')
        return next();
    }
    // if user is not signed in
    console.log('User is not authenticated.')
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we're just sending this to locals for the views
        res.locals.user = req.user;
    }
    return next();
}


