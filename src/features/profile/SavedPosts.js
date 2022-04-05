import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader";
import { PostList } from "../post/PostList";
import { getSavedPosts } from "./profileSlice";

export const SavedPosts = () => {

    const { token } = useSelector(state => state.user);
    const { profileStatus, savedPosts } = useSelector(state => state.profile);    

    const dispatch = useDispatch();

    useEffect(() => {
        if (profileStatus === "idle") {
            dispatch(getSavedPosts({ token }));
        };
    }, [dispatch, profileStatus, token]);

    if (profileStatus === "loading") {
        return <Loader/>
    };

    return (
        <div className="py-2 mr-2 mt-2 w-full lg:w-[60%]">
            <PostList posts={savedPosts}/>
        </div>
    )
}