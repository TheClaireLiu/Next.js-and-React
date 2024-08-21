import {useState, useEffect} from 'react';
import {useLoaderData} from 'react-router-dom';

import Post from "./Post.jsx";
import NewPost from '../routes/NewPost.jsx';
import Modal from './Modal.jsx';
import classes from './PostsList.module.css';

// eslint-disable-next-line react/prop-types
// cannot use async and await to update posts whenever got a response.
function PostsList({isPosting, onStopPosting}){

    //理论上，它会在新的post里更新State，导致一个无限循环。
    // fetch('http://localhost:8080/posts').then(response => response.json()).then(data => {
    //     setPosts(data.posts);
    //   }
    // );

    const posts = useLoaderData();

    // const [posts, setPosts] = useState([]);
    // 用这个在抓取数据的同时使用它来显示另一个UI
    // const [isFetching, setIsFetching] = useState(false);

    /*useEffect 允许安全地运行以上代码，但不会无限循环*/
    //useEffect 不会返回值，相反，它接受一个函数作为值，和一个数组作为第二个参数
    /*This useEffect(hook), 确保effect函数不总是在组件函数执行时执行，来避免无限循环
    什么时候执行由第二个参数 数组决定。这个数组指定了Effect函数的dependencies，
    a dependency is simply any variable or function,might be defined outside of this Effect function
    anywhere in your effect components, 每当这样一个变量或定义在effect函数之外的函数发生变化时，这个effect函数将再次执行。     */
    // useEffect(() => {
    //     async function fetchPosts(){
    //         setIsFetching(true);
    //
    //         setPosts(resData.posts);
    //         setIsFetching(false);
    //     }
    //     fetchPosts();
    // }, []);//这里时空数组意味着Effect函数只会执行一次，组件首次渲染时没有任何posts，然后立即执行这个Effect函数，更新posts

    // function addPostHandler(postData){
    //
    //     // A rule: if you update state, and that state is based on that previous state,
    //     // you should pass a function to setPosts, for example: arrow function;
    //     // and this function will be called automatically by React whenever you call setPosts.
    //     // and this function will automatically receive the current state snapshot. and return the new state value.
    //     setPosts((existingPosts) => [postData, ...existingPosts]); //postData object was added to the front of posts array.
    // }

    // whenever any of these two states changes, this PostsList component function will be executed again.
    // 这种情况下，return 里面的整个JSX代码都将被再次评估，其中嵌套的组件函数也将再次执行
    // 这意味着我们将更新的状态值作为其props的值传递给post组件函数，这些更新的值将反映在该组件的JSX代码中，UI也将更新

    return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          {/*use the bodyChangeHandler as a value, that's passed to the onBodyChange prop*/}
          <NewPost onCancel = {onStopPosting} onAddPost = {addPostHandler} />
        </Modal>
      )}
        {posts.length > 0 && (
          <ul className={classes.posts}>
              {/*可以在[]中括号里面写JSXcode。因此这里可以直接写posts，
            map() is executed by browser for every item in this array,
            map() return a new array, 旧数组中的每一项都被转换成一个新的值。
             这里想把每个post 转换成一个post JSX element.*/}

              {/*如果将数组映射到JSX元素数组，需要添加key prop添加到JSX元素中,用来保证每个帖子都是唯一的*/}
              {posts.map((post) => (
                <Post key={post.id} id={post.id} author={post.author} body={post.body} />
              ))}
              {/*<Post author="Manuel" body="Check out the full course!"/>*/}
          </ul>
        )}
        { posts.length === 0 && (
          <div style={{textAlign: 'center',color: 'white' }}>
            <h2>There are no posts yet.</h2>
            <p>Start adding some!</p>
          </div>
        )}

    </>
    );
}

export default PostsList;