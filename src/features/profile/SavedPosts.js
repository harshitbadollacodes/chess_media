import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader";
import { PostList } from "../post/PostList";
import { getSavedPosts } from "./profileSlice";

export const SavedPosts = () => {

    const { token } = useSelector(state => state.user);
    const { status, savedPosts } = useSelector(state => state.profile);
    console.log(status);
    console.log(savedPosts);

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "idle") {
            dispatch(getSavedPosts({ token }));
        };
    }, [dispatch, status, token]);

    if (status === "loading") {
        return <Loader/>
    };

    return (
        <div className="py-2 mr-2 mt-2 w-full lg:w-[60%]">
            <PostList posts={savedPosts}/>
        </div>
    )
}
