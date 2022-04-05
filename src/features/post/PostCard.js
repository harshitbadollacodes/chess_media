import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostList } from "./PostList";
import { addComment, removeComment } from "./postSlice";
import { BsTrash } from "react-icons/bs";
import { UserDisplayPicture } from "../../components/UserDisplayPicture";

export const PostCard = () => {
    const { postId } = useParams();
    const { userId, token } = useSelector(state => state.user);
    const { posts } = useSelector(state => state.posts);
    console.log(posts);
    
    const [inputComment, setInputComment] = useState("");

    const dispatch = useDispatch();


    const findPost = posts.find(post => post._id === postId);
    const post = [findPost];

    const comments = findPost.comments;
    console.log(comments);

    function commentHandler(e) {
        e.preventDefault();
        dispatch(addComment({token, inputComment, postId}));

        setInputComment("");
    };

    function removeCommentHandler(token, commentId, postId) {
        dispatch(removeComment({token, commentId, postId}));
    }

    return (
        <div className="py-2 mr-2 mt-2 w-full lg:w-[60%]">
            <PostList posts={post}/>
            <h3>Comments</h3>

            <form onSubmit={(e) => commentHandler(e)}>
                <input 
                    type="text"
                    required
                    className="w-full p-2 rounded my-2 border-2 border-d-blue"
                    placeholder="Make your move here"
                    onChange={(e) => setInputComment(e.target.value)}
                    value={inputComment}
                />

                <input 
                    type="submit"
                    value="Post"
                    className="btn block ml-auto"
                />
            </form>

            <ul>
            {
                comments.map(comment =>                     
                    <li 
                        key={comment._id}
                        className="flex my-4"
                    >   
                        <UserDisplayPicture displayPicture={comment.user.displayPicture} />

                        <div className="w-full flex justify-between">
                            <div className="ml-4 flex flex-col">
                                <Link 
                                        to={`/profile/${comment.user._id}`} 
                                        className="font-bold hover:text-l-blue"
                                    >
                                        <p className="capitalize"> { comment.user.firstName } { comment.user.lastName } </p>
                                        <p className="font-extralight"> @{ comment.user.username } </p>
                                    </Link>   
                                <p>{comment.comment}</p>
                            </div>

                            { comment.user._id === userId &&
                                <button 
                                    className="hover:text-red-500"
                                    onClick={() => removeCommentHandler(token, comment._id, postId)}
                                >
                                    <BsTrash size={20} />
                                </button>
                            }

                        </div>
                        
                    </li>
                )
            }
            </ul>
        </div>
    )
}
