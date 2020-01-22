const Post = require('../models/posts_schema');

module.exports.create = function(req, res){
    Post.create({
        content : req.body.content,
        user : req.user._id
    }, function(err, post){
        if(err){
            console.log('Error creating the post.');
            return;
        }
        return res.redirect('back');
    })
}