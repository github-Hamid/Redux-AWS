import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";

import React from "react";

const PostAuthor = (props) => {
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => {
    return user.id === props.userId;
  });
  return <span>by {author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
