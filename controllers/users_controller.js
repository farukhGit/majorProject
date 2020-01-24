const User = require('../models/user_schema');
const Post = require('../models/posts_schema');

module.exports.userHome = async function(req, res){
    try {
        let posts = await Post.find({})
                .populate('user')
                .populate({
                    path : 'comments',
                    populate : {
                        path : 'user'
                    }
                });

        let users = await User.find({});         
        
        return res.render('user_home', {
            title : 'User | Home',
            all_posts : posts,
            all_users_list : users
        });
    } catch (error) {
        console.log('Error : ', err);
        return;
    }
}

module.exports.profile = async function(req, res){
    try {
        let user = await User.findById(req.params.id);

        let posts = await Post.find({user : user._id}).populate('comments');
        
        return res.render('profile', {
            title : 'Profile',
            users_posts : posts,
            profile_user : user
        });
        
    } catch (error) {
        console.log('Error', err);
        return;
    }
}

module.exports.update = (req, res)=>{
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, {name : req.body.updateName, email : req.body.updateEmail}, (err, user)=>{
            return res.redirect('/users/user_home');
        })
    }else{
        res.status(401).send('Unauthorized Access');
    }
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
    try {

        req.flash('success', 'Logged in Successfully');
        return res.redirect('/users/user_home');

    } catch (error) {
        console.log('Error : ', err);
        return;
    }
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'Logged Out Successfully');
    return res.redirect('/');
}

