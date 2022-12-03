import React from "react";
import { useParams } from "react-router-dom";
import PostExcerp from "./PostExcerp.js";

function SinglePagePost() {
  let { id } = useParams();
  return <PostExcerp id={id} />;
}

export default SinglePagePost;
