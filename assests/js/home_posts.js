{
  // method to submit the form data for a new post using AJAX
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $("#post-list-container>ul").prepend(newPost);
          deletePost($(".delete-post-button", newPost));

          // call the create comment class
          new PostComments(data.data.post._id);

          //CHANGE :: enable the functionality of the toggle like button on the post
          new ToggleLike($(" .toggle-like-button", newPost));

          new Noty({
            theme: "relax",
            text: "Post published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
      document.getElementById("form-input").value = "";
    });
  };

  // method to create a post in the DOM
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
      <p>
          <small>
              <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
          </small>
          ${post.content}
          <br>
          <small>
              Posted By: ${post.user.name}
          </small>
          <br>
          <small>
              <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                  0 Likes
              </a>
          </small>
          <div class="post-comments">
              <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
                  <input type="text" name="content" placeholder="Write a comment..." required>
                  <input type="hidden" name="post" value="${post._id}">
                  <button value="Comment">Comment</button>
              </form>
              <div class="post-comments-list">
                  <ul id="post-comments-${post._id}">
                  </ul>
              </div>
          </div>
      </p>
  </li>`);
  };

  // method to delete a post from the DOM
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (event) {
      event.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
          new Noty({
            theme: "relax",
            text: "Post Deleted",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // loop over all the existing posts on the page (when the window loads for the first time)
  // and call the delete post method on the delete link of each,
  // also add AJAX (using the class we've created) to the delete button of each
  let convertPostsToAjax = function () {
    $("#post-list-container>ul>li").each(function () {
      let self = $(this);
      let deleteButton = $(".delete-post-button", self);
      deletePost(deleteButton);

      // get the post's id by splitting the id attribute
      let postId = self.prop("id").split("-")[1];
      new PostComments(postId);
    });
  };

  createPost();
  convertPostsToAjax();
}
