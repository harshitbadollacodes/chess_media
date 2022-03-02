import { useSelector } from "react-redux";
import { PostList } from "../features/post/PostList";

export function Home() {

    const { posts } = useSelector(state => state.posts);

    return (
        <div className="py-2 mr-2 mt-2 w-full lg:w-[60%]">
            <PostList posts={posts}/>
        </div>
    );
}