const Post = require('../models/posts_schema');
const Comment = require('../models/comments_schema');
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

module.exports.destroy = (req, res)=>{
    Post.findById(req.params.id, function(err, post){
        if(err){
            throw err;
        }
        if(req.user.id == post.user){
            post.remove();
            Comment.deleteMany({post : req.params.id}, function(err){
                if(err){
                    console.log('Error deleting the posts.');
                    return;
                }
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}