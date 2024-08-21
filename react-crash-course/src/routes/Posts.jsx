// 在JSX code中，小写字母开头的元素被认为是HTML元素，components以大写字母开头
// import {useState, useEffect} from 'react';

import {Outlet} from 'react-router-dom';
import PostsList from '../components/PostsList.jsx';

function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Posts;

export async function loader(){
  const response = await fetch('http://localhost:8080/posts');
  const resData = await response.json();
  return resData.posts;
};
