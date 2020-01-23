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