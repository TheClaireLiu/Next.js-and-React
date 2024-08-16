import classes from "./Post.module.css";

function Post(props){
    return (
        <li className={classes.post}>
            {/* eslint-disable-next-line react/prop-types */}
            <p className={classes.author}>{props.author}</p>
            {/* eslint-disable-next-line react/prop-types */}
            <p className={classes.text}>{props.body}</p>
        </li>
    );
}

// 可以导出为一个文件
export default Post;