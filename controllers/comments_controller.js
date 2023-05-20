// const Comment = require('../models/comment');
// const Post = require('../models/post');

// module.exports.create = function(req, res){
//     // 'req.body.post' , here 'post' is the name of hidden input in comment-form
//     Post.findById(req.body.post, function(err, post){    
//         if(err){
//             console.log("Error in finding post");
//             return;
//         }

//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 user: req.user._id,
//                 post: req.body.post   // or post._id
//             }, function(err, comment){
//                 if(err){
//                     console.log("Error in creating comment to post");
//                     return;
//                 }

//                 // adding comment to the post (comment array defined in postSchema)
//                 post.comments.push(comment);
//                 post.save();

//                 return res.redirect('/');
//             });
//         }
//     });
// };


const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
      });

      post.comments.push(comment);
      await post.save();

      return res.redirect('/');
    }
  } catch (err) {
    console.log("Error in creating comment to post", err);
    return res.redirect('back');
  }
};
