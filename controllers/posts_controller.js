const Post = require('../models/posts_schema');
const Comment = require('../models/comments_schema');

module.exports.create = function(req, res){
    try {
        Post.create({
            content : req.body.content,
            user : req.user._id
        }, function(err, post){
            
            return res.redirect('back');
        });
    } catch (error) {
        console.log('Error : ', err);
        return;
    }   
}

module.exports.destroy = async (req, res)=>{
    try {
        let post = await Post.findById(req.params.id); 
        
        if(req.user.id == post.user){
            post.remove();
            Comment.deleteMany({post : req.params.id}); 
            return res.redirect('back');
        }else{
            return res.redirect('user_home');
        }

    } catch (error) {
        console.log('Error : ', err);
        return;
    }
}