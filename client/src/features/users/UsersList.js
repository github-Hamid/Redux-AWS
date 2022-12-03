import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./userSlice.js";
import { Link } from "react-router-dom";
import "../../css/userList.css";
function UsersList() {
  const users = useSelector(selectAllUsers);
  const renderedUsers = users.map((user) => {
    return (
      <div className="user-list-container">
        <li key={user.id}>
          <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
      </div>
    );
  });

  return (
    <section>
      <h2>
        <ul>{renderedUsers}</ul>
      </h2>
    </section>
  );
}

export default UsersList;
