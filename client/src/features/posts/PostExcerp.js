import React from "react";
import TimeAgo from "./TimeAgo";
import PostAuthor from "./PostAuthor";
import ReactionButton from "./ReactionButton";
import "../../css/postExcerp.css";
import { useNavigate } from "react-router-dom";
import { getPostById } from "./postSlice.js";
import { useSelector } from "react-redux";
function PostExcerp(props) {
  const post = useSelector((state) => getPostById(state, props.id));
  const navigate = useNavigate();
  function cardClicked(id) {
    navigate(`post/${id}`);
  }

  return (
    <article id={post.id} className="card">
      <h3 className="card-title">{post.title}</h3>
      <p className="card-body">{post.body.substring(0, 100)}</p>
      <TimeAgo timestamp={post.date} />
      <p className="card-author">
        <PostAuthor userId={post.userId} />
      </p>
      <ReactionButton post={post} />
      <button className="button-post"
        onClick={() => {
          cardClicked(post.id);
        }}
      >
        View Post
      </button>
    </article>
  );
}

export default PostExcerp;
