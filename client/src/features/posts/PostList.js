import { useSelector, useDispatch } from "react-redux";
import { selectPostIds, getStatus, fetchPost } from "./postSlice.js";
import React, { useEffect } from "react";
import AddPostForm from "../addPostForm.js";
import PostExcerp from "./PostExcerp.js";
import "../../css/postList.css"
const PostList = () => {
  const dispatch = useDispatch();
  const orderedPostIds = useSelector(selectPostIds);
  const postStatus = useSelector(getStatus);
  useEffect(() => {
    if (postStatus === "idle") dispatch(fetchPost());
  }, [postStatus, dispatch]);

  let content = "";
  if (postStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postStatus === "succeeded") {
    content = orderedPostIds.map((postId) => {
      return <PostExcerp key={postId} id={postId} />;
    });
  } else if (postStatus === "error") {
    content = <p>Error!</p>;
  }

  return (
    <div>
      <h2>Posts</h2>
      <AddPostForm />
      <div className="card-container">
      {content}
      </div>
    </div>
  );
};

export default PostList;
