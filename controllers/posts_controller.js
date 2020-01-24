const Post = require('../models/posts_schema');
const Comment = require('../models/comments_schema');

module.exports.create = function(req, res){
    try {
        Post.create({
            content : req.body.content,
            user : req.user._id
        }, function(err, post){
            
            req.flash('success', 'Post published!');
            return res.redirect('back');
        });
    } catch (error) {
        req.flash('error', err);
        return res.redirect('back');
    }   
}

module.exports.destroy = async (req, res)=>{
    try {
        let post = await Post.findById(req.params.id); 
        
        if(req.user.id == post.user){
            post.remove();
            Comment.deleteMany({post : req.params.id}); 
            req.flash('warning', 'Post deleted!');
            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized Action!');
            return res.redirect('user_home');
        }

    } catch (error) {
        req.flash('error', err);
        return;
    }
}