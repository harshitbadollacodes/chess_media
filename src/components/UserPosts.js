import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostsList } from "../features/post/PostsList";

export function UserPosts() {

    const { posts } = useSelector(state => state.posts);

    const { profileId } = useParams();

    const userPosts = posts.filter(postDetails => {
        return postDetails.user._id === profileId
    });
    
    return (
        <PostsList posts={userPosts}/>
    )
    
};
