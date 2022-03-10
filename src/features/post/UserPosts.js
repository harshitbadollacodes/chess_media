import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostList } from "./PostList";

export function UserPosts() {

    const { posts } = useSelector(state => state.posts);

    const { profileId } = useParams();

    const userPosts = posts.filter(postDetails => {
        return postDetails.user._id === profileId
    });
    
    return (
        <PostList posts={userPosts}/>
    )
    
};
