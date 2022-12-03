import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getCounter, increaseCount } from "../features/posts/postSlice"
import "../css/header.css"
const Header = () => {
    const dispatch = useDispatch();
   const count = useSelector(getCounter);

    return (
        <header className="container">
            <div className="content">
            <h1 >Redux Blog</h1>
                <button onClick={()=>{dispatch(increaseCount())}}>{count}</button>
            </div>
            
            <nav className="navigation">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="post">Add Post</Link></li>
                    <li><Link to="user">Users</Link></li>
                </ul>
            </nav>
            
        </header>
    )
}

export default Header