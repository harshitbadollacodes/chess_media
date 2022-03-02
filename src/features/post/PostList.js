import { useEffect } from "react";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa"
import { BsPencil, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { likeButtonClicked, loadPostsData, removePost, savePost } from "./postSlice";

export function PostList({ posts }) {

    const { userId, token } = useSelector(state => state.user);
    const { status } = useSelector(state => state.posts);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (status === "idle") {
            dispatch(loadPostsData(token));
        };
        
    }, [dispatch, status, token]);

    if (status === "loading") {
        return <Loader/>
    };

    const renderList = posts?.map(post => (
        <li
            className="border-2 p-2 my-2 flex rounded-xl bg-white" 
            key={post._id}
        >
            <div 
                className="border-2 hover:border-l-blue transition-colors duration-300 rounded-full p-4 h-14 w-14 flex items-center justify-center"
            >
                <Link 
                    to={`/profile/${post.user._id}`} 
                    className="font-bold text-xl"
                >
                    {post.user.firstName.split("")[0].toUpperCase()}
                    {post.user.lastName.split("")[0].toUpperCase()}
                </Link>
            </div>
            
            <div 
                key={post._id} 
                className="mx-2 w-full"
            >
                <div className="flex justify-between">
                    <Link 
                        to={`/profile/${post.user._id}`} 
                        className="font-bold hover:text-l-blue"
                    >
                        <p className="capitalize"> { post.user.firstName } { post.user.lastName } </p>
                        <p className="font-extralight"> @{ post.user.username } </p>
                    </Link>   
                    
                        {
                            post.user._id === userId &&
                            <div>
                                <button onClick={() => dispatch(removePost({token, postId: post._id}))}>
                                    <BsTrash />
                                </button>

                                <Link to={`/editPost/${post._id}`}>
                                    <BsPencil />
                                </Link>

                            </div>
                        }
                </div>

                <p className="text-xl my-2 w-full "> {post.postContent} </p>
                
                {post.image && 
                    <img src={post.image} className="w-[100%]" alt={post.postContent} />
                }

                <div className="flex justify-between mt-4">
                    <div className="flex items-center w-fit">
                        <button 
                            className="mt-2"
                            onClick={() => dispatch(likeButtonClicked({token, postId: post._id}))}
                        >
                            {   
                                post.likes.includes(userId) 
                                ? <FaHeart className="mb-1 text-red-600"/>
                                : <FaRegHeart className="mb-1 "/>
                            }
                        </button>
                        
                        <p className="text-xl ml-2">{post.likes.length}</p>
                    </div>
                    
                    <div className="flex items-center w-fit">
                        <button onClick={() => navigate(`/post/${post._id}`)}>
                            <FaRegComment/> 
                        </button>
                        <p className="text-xl ml-2">{post.comments.length}</p>
                    </div>

                    <button 
                        onClick={() => dispatch(savePost({token, postId: post._id}))}
                    >
                        {   
                            post.savedPosts.includes(userId) 
                            ? <FaBookmark/>
                            : <FaRegBookmark/>
                        }
                    </button>
                    
                </div>
            </div>
        </li>
    ));


    return (
        <div>
            <ul>
                {renderList}
            </ul>
        </div>
    );
}