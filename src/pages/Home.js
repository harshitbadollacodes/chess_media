import { useSelector } from "react-redux";
import { PostsList } from "../features/post/PostsList";

export function Home() {

    const { posts } = useSelector(state => state.posts);

    return (
        <div className="py-2 mr-2 mt-2 w-full lg:w-[60%]">
            <PostsList posts={posts}/>
        </div>
    );
}