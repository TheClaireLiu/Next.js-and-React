import classes from './NewPost.module.css';
import {useState} from "react";

function NewPost({onCancel}) {
    // 当输入到该文本区域的值发生更改时都会触发,function 代表触发后会发生的内容、
    // with React， we use declarative approach（声明式方法）添加一个特殊的prop， 一个以on开头的prop，然后是想要监听的事件名称
    // document.querySelector('textarea').addListener('change', function(event e){})；

    // const [enteredBody, setEnteredBody] = useState('');

    //use setEnteredBody function update the useState,
    // the enteredBody is the firstValue of useState equals '';

    // function changeBodyHandler(){
        // let enteredBody = event.target.value;
    //     setEnteredBody(event.target.value);
    // }

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

  function submitHandler(event){
    event.preventDefault();//阻止submit按钮被点击时，浏览器默认生成和发送http请求，
    const postData = {
      body: enteredBody,
      author: enteredAuthor
    };
    console.log(postData);
    onCancel(); //关闭NewPosNewPostNewPost窗口
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="body">Text</label>
        {/*props.onBodyChange作为一个值被接收到onChange prop，*/}
        {/* eslint-disable-next-line react/prop-types */}
        <textarea id="body" required rows={3} onChange={bodyChangeHandler}/>
      </p>
      {/*<p>{enteredBody}</p>*/}
      <p>
        <label htmlFor="name">Your name</label>
        {/* eslint-disable-next-line react/prop-types */}
        <input type="text" id="name" required onChange={authorChangeHandler}/>
      </p>

      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>Cancel</button>
        <button >Submit</button>
      </p>

    </form>
  );
}

export default NewPost;