import { Link } from 'react-router-dom';

import classes from "./Post.module.css";

function Post({ id, author, body }){
    return (
        <li className={classes.post}>
          <Link to={id}>
            {/* eslint-disable-next-line react/prop-types */}
            <p className={classes.author}>{author}</p>
            {/* eslint-disable-next-line react/prop-types */}
            <p className={classes.text}>{body}</p>
          </Link>
        </li>
    );
}

// 可以导出为一个文件
export default Post;