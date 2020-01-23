const Comment = require('../models/comments_schema');
const Post = require('../models/posts_schema');

module.exports.create = (req, res)=>{
   Post.findById(req.body.post, function(err, post){
       
        if(post){
            Comment.create({
                content : req.body.content,
                user : req.user._id,
                post : req.body.post
            }, function(err, comment){
                if(err){
                    console.log('Error creating comment.');
                    return;
                }

                post.comments.push(comment);
                post.save();

                return res.redirect('back');
            }); 
        }
   });
}

module.exports.deleteComment = (req, res)=>{
    Comment.findById(req.params.id, function(err, comment){
        if(err){
            console.log('Error deleting the comment.');
            return;
        }
        if(req.user.id == comment.user){
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id}}, function(err, post){
            return res.redirect('back');
        });
        }else{
            return res.redirect('back');
        }
    });
}