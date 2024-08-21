import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

// import App from './routes/App.jsx'
import NewPost, { action as newPostAction } from './routes/NewPost.jsx';
import Posts,{ loader as postsLoader } from "./routes/Posts.jsx";
import RootLayout from './routes/RootLayout.jsx';
import PostDetails, { loader as postDetailsLoader } from "./routes/PostDetails.jsx";
import './index.css';


// 参数是一个数组，a list of route definitions
const router = createBrowserRouter([
  //an object with path property:where; for example: define the path of a single route.
  // element property: where define the JSX code, it should be rendered on the screen when this route becomes active.
  {
    path: '/', element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Posts />,
        // loader property: expect to get a function as value,
        // React router will execute that function whenever that route gets activated.
        loader: postsLoader,
        children: [
          // action和loader一样需要一个function作为value，
          { path: '/create-post', element: <NewPost />, action: newPostAction },
          { path: '/:id', element: <PostDetails />, loader: postDetailsLoader }
        ],
      }, //equals to enter our domain
    ],
  },
]);


// 在index.html文件中，ID为root的div，应该呈现render()括号里的代码。
// <App />指的是 app.jsx文件，
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 需要告诉ReactRouter应该为哪些路径加载哪些组件，所以必须配置router,值是route configuration object，this object is created with a function called createBrowserRouter*/}
    <RouterProvider router={router}  />

  </React.StrictMode>,
)
