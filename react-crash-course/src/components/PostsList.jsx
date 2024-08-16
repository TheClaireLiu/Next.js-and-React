import {useState} from 'react';

import Post from "./Post.jsx";
import NewPost from './NewPost.jsx';
import Modal from './Modal.jsx';
import classes from './PostsList.module.css';

function PostsList({isPosting, onStopPosting}){

    // whenever any of these two states changes, this PostsList component function will be executed again.
    // 这种情况下，return 里面的整个JSX代码都将被再次评估，其中嵌套的组件函数也将再次执行
    // 这意味着我们将更新的状态值作为其props的值传递给post组件函数，这些更新的值将反映在该组件的JSX代码中，UI也将更新


    return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          {/*use the bodyChangeHandler as a value, that's passed to the onBodyChange prop*/}
          <NewPost
            onCancel = {onStopPosting}
          />
        </Modal>
      )}

        <ul className={classes.posts}>
            <Post author="Manuel" body="Check out the full course!"/>
        </ul>

    </>
    );
}

export default PostsList;