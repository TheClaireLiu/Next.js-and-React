import Post from "./Post.jsx";
import classes from './PostsList.module.css';
import NewPost from './NewPost.jsx';
import {useState} from 'react';

function PostsList(){
    // whenever any of these two states changes, this PostsList component function will be executed again.
    // 这种情况下
    const [enteredBody, setEnteredBody] = useState('');
    const [enteredAuthor, setEnteredAuthor] = useState('');

    //when textArea changes, this function is invoked
    function bodyChangeHandler(event){
        //setEnteredBody equals event.target.value
        setEnteredBody(event.target.value);
    }
    function authorChangeHandler(event){
        setEnteredAuthor(event.target.value);
    }

    return (
    <>
        {/*use the bodyChangeHandler as a value, that's passed to the onBodyChange prop*/}
        <NewPost onBodyChange={bodyChangeHandler} onAuthorChange={authorChangeHandler}/>
        <ul className={classes.posts}>
            <Post author="Maximlian" body={enteredBody}/>
            <Post author="Manuel" body={enteredAuthor}/>
        </ul>
    </>
    );
}

export default PostsList;