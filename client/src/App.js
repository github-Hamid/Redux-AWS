
import './App.css';
import PostList from './features/posts/PostList.js';
import {useDispatch} from "react-redux";
import {fetchUsers} from "./features/users/userSlice.js"
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SinglePagePost from './features/posts/SinglePagePost';
import UsersList from './features/users/UsersList';
import UserPage from './features/users/UserPage';

import Layout from './components/Layout';
import AddPostForm from './features/addPostForm';


function App() {
  let dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchUsers())
  },[])
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<PostList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":id" element={<SinglePagePost />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        {/* Catch all - replace with 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Route>
    </Routes>
  );
}

export default App;
