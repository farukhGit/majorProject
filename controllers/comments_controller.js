const Comment = require('../models/comments_schema');
const Post = require('../models/posts_schema');

module.exports.create = (req, res)=>{
       try {
        Post.findById(req.body.post, function(err, post){  
            if(post){
                Comment.create({
                    content : req.body.content,
                    user : req.user._id,
                    post : req.body.post
                }, function(err, comment){
                    post.comments.push(comment);
                    post.save();
                    req.flash('success', 'Comment Success!');
                    return res.redirect('back');
                }); 
            }
       });
       } catch (error) {
           req.flash('error', err);
           return;
       }
}

module.exports.deleteComment = async (req, res)=>{
    try {
        let comment = await Comment.findById(req.params.id);

        if(req.user.id == comment.user){
            let postId = comment.post;
            comment.remove();    
            await Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id}});
            req.flash('warning', 'Comment deleted!');
            return res.redirect('back');
        }else{
            req.flash('warning', 'Unauthorized Access.');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', err);
        return;
    }
}