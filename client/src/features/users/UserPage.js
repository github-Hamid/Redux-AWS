import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "./userSlice.js";
import { selectPostsByUser } from "../posts/postSlice.js";
import { useParams, Link } from "react-router-dom";
import "../../css/userPage.css";
function UserPage() {
  const { userId } = useParams();
  console.log("id:", userId);
  const user = useSelector((state) => {
    return selectUserById(state, userId);
  });
  const postForUser = useSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );
  console.log("post:", postForUser, "user:", user);
  const postTitles = postForUser.map((post) => {
    return (
      <div className="user-page-container">
        <li key={post.id}>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
      </div>
    );
  });
  return (
    <>
      <div className="div-name">{user?.name}</div>
      <ul>{postTitles}</ul>
    </>
  );
}

export default UserPage;
