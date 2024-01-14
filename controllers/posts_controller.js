const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req, res){
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id
    });
    
    if(req.xhr){
      return res.status(200).json({
        data:{
          post: post
        },
        message: "Post created!"
      });
    }

    return res.redirect('back');
  } catch (error) {
    console.log("Error in creating a post", error);
    return;
  }
};

module.exports.destroy = async function(req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if(post.user == req.user.id){
      //User can only delete it own posts
      
      // delete the associated likes for the post and all its comments likes too
      // "$in" operator will select all the comments (comment._id) from the 'post.comments' array
      await Like.deleteMany({ likeable: post, onModel: 'Post' });
      await Like.deleteMany({ _id: { $in: post.comments } });

      await post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });
      if(req.xhr){
        return res.status(200).json({
          data: {
            post_id: req.params.id
          },
          message: "Post Deleted"
        });
      }
      req.flash('success', 'Post and associated comments deleted!');
      return res.redirect('back');
    }else{
      req.flash('error', 'You cannot delete this post!');
      return res.redirect('back');
    }
  } catch (error) {
    console.log("Error in deleting comments",error);
    req.flash('error', error);
    return res.redirect('back');
  }
};