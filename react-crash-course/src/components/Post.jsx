import classes from "./Post.module.css";

function Post({author, body}){
    return (
        <li className={classes.post}>
            {/* eslint-disable-next-line react/prop-types */}
            <p className={classes.author}>{author}</p>
            {/* eslint-disable-next-line react/prop-types */}
            <p className={classes.text}>{body}</p>
        </li>
    );
}

// 可以导出为一个文件
export default Post;