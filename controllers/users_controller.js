const User = require('../models/user_schema');
const Post = require('../models/posts_schema');

module.exports.userHome = function(req, res){
    // Post.find({}, function(err, posts){
    //     if(err){
    //         console.log('Error finding the post!');
    //         return;
    //     }
    //     return res.render('user_home', {
    //         title : 'User | Home',
    //         all_posts : posts
    //     });
    // })
    Post.find({}).
    populate('user').
    exec(function(err, posts){
        if(err){
            console.log('Error finding posts!');
            return;
        }
        return res.render('user_home', {
            title : 'User | Home',
            all_posts : posts
        });
    });
}

module.exports.profile = function(req, res){
    return res.render('profile', {
        title : 'Profile'
    });
}

module.exports.create = function(req, res){
    // create a user document in the database
    if(req.body.password != req.body.confirmPassword){
        console.log('Passwords don\'t match');
        return res.redirect('back');
    }
    // check if the user already exists in the database
    User.findOne({email : req.body.email}, (err, user)=>{
        if(err){
            console.log('Error creating a user');
            return res.redirect('back');
        }
        if(user){
            console.log('E-mail already exists!');
            return res.redirect('back');
        }else{
            User.create({
                email : req.body.email,
                name : req.body.username,
                password : req.body.password
            }, (err, user)=>{
                if(err){
                    console.log('Error creating a user.');
                    return res.redirect('back');
                }
                console.log('Success creating a new user');
                return res.redirect('back');
            });
        }
    });
}

module.exports.createSession = function(req, res){

    return res.redirect('/users/user_home');
}

module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}

