import { useState } from "react";
import { addPost } from "../features/posts/postSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../features/users/userSlice.js";
import "../css/addPost.css";
const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const userOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  function titleChanged(e) {
    setTitle(e.target.value);
  }

  function contentChanged(e) {
    setBody(e.target.value);
  }

  function userChanged(e) {
    setUserId(e.target.value);
  }

  function addPostClicked(e) {
    dispatch(addPost({ title, body, userId }));
    // dispatch(postAdded(title, content, userId));
    setTitle("");
    setBody("");
  }
  return (
    <div className="form-container">
      <div className="row">
        <label htmlFor="title">Title</label>
        <input id="title" value={title} onChange={titleChanged} />
      </div>
      <div className="row">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={body}
          onChange={contentChanged}
          cols="30"
          rows="4"
        />
      </div>
      <div className="row">
        {" "}
        <label htmlFor="user">User</label>
        <select value={userId} onChange={userChanged}>
          {userOptions}
        </select>
      </div>
      <div className="row">
        <button onClick={addPostClicked}>Add Post</button>
      </div>
    </div>
  );
};

export default AddPostForm;
