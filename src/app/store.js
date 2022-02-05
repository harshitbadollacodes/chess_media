import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";
import profileReducer from "../features/profile/profileSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        posts: postReducer
    }
});