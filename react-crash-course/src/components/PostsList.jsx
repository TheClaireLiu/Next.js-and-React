import {useState} from 'react';

import Post from "./Post.jsx";
import NewPost from './NewPost.jsx';
import Modal from './Modal.jsx';
import classes from './PostsList.module.css';

// eslint-disable-next-line react/prop-types
function PostsList({isPosting, onStopPosting}){
    const [posts, setPosts] = useState([]);

    function addPostHandler(postData){
        // A rule: if you update state, and that state is based on that previous state,
        // you should pass a function to setPosts, for example: arrow function;
        // and this function will be called automatically by React whenever you call setPosts.
        // and this function will automatically receive the current state snapshot. and return the new state value.
        setPosts((existingPosts) => [postData, ...existingPosts]); //postData object was added to the front of posts array.
    }

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
              {posts.map((post) => <Post key={post.body} author={post.author} body={post.body}/>)}

              {/*<Post author="Manuel" body="Check out the full course!"/>*/}
          </ul>
        )}
        {posts.length === 0 && (
          <div style={{textAlign: 'center',color: 'white' }}>
            <h2>There are no posts yet.</h2>
            <p>Start adding some!</p>
          </div>
        )}


    </>
    );
}

export default PostsList;