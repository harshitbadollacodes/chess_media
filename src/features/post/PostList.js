import { useEffect } from "react";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa"
import { BsPencil, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { likeButtonClicked, loadPostsData, removePost } from "./postSlice";
import { Username } from "../../components/Username";
import { UserDisplayPicture } from "../../components/UserDisplayPicture";
import { savePost } from "../profile/profileSlice";
import { Spinner } from "../../components/Spinner";

export function PostList({ posts }) {
    
    const { userId, token } = useSelector(state => state.user);
    const { savedPosts, profileStatus } = useSelector(state => state.profile);
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

    let isSavedPost = (postId) => savedPosts.some(savedPost => savedPost._id === postId);

    const renderList = posts?.map(post => (
        <li
            className="border-2 p-2 my-2 flex rounded-xl bg-white" 
            key={post._id}
        >
            
                
            <UserDisplayPicture displayPicture={post.user.displayPicture} />
            
            <div 
                key={post._id} 
                className="mx-2 w-full"
            >
                <div className="flex justify-between">
                    <Link 
                        to={`/profile/${post.user._id}`} 
                        className="font-bold hover:text-l-blue"
                    >
                        <Username 
                            firstName={post.user.firstName} 
                            username={post.user.username}
                        />
                    </Link>   
                    
                        {
                            post.user._id === userId &&
                            <div>
                                <button 
                                    className="hover:text-red-500"
                                    onClick={() => dispatch(removePost({token, postId: post._id}))}
                                >
                                    <BsTrash size={20} />
                                </button>

                                <Link 
                                    to={`/editPost/${post._id}`}
                                    className="hover:text-blue-500"
                                >
                                    <BsPencil size={20} />
                                </Link>

                            </div>
                        }
                </div>

                <p className="text-xl my-2 w-full "> {post.postContent} </p>
                
                {post.image && 
                    <img src={post.image} className="w-[100%] h-[29em]" alt={post.postContent} />
                }

                <div className="flex justify-between mt-4">
                    <div className="flex items-center w-fit">
                        <button 
                            className="mt-2"
                            onClick={() => dispatch(likeButtonClicked({token, postId: post._id}))}
                        >   
                            {   
                                post.likes.includes(userId) 
                                ? status === "load spinner" 
                                ? <Spinner/> : <FaHeart className="mb-1 text-red-600"/>    
                                : status === "load spinner" 
                                ? <Spinner/> : <FaRegHeart className="mb-1 "/>
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
                        onClick={ () => dispatch(savePost({token, postId: post._id})) }
                    >
                        {   
                            isSavedPost(post._id)
                            ? profileStatus === "load spinner"
                            ? <Spinner/> : <FaBookmark/>
                            : profileStatus === "load spinner" 
                            ? <Spinner/> : <FaRegBookmark/>
                        }
                    </button>
                    
                </div>
            </div>
        </li>
    ));

    return (
        <div>
            <ul>
                {
                    posts.length > 0 
                    ? renderList
                    : <div className="w-full flex flex-col items-center justify-center mt-2 bg-white text-center min-h-[20vh] rounded-lg">    
                        <p className="text-2xl">Looks all empty here. Create a new post? </p>
                        <Link to="/post" className="btn my-4">Crete Post</Link>
                    </div>
                }
            </ul>
        </div>
    );
}