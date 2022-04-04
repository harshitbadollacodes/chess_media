import axios from "axios";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { API } from "../../constants/config";

export const getUserDetails = createAsyncThunk( 
    "profile/getUserDetails", 
    async (userId) => {        
        const response = await axios.get(`${API}/user/profile/${userId}`);
        return response.data;
    }
);

export const editBio = createAsyncThunk(
    "profile/editBio",
    async({bio, imageURL, token}) => {
        const response = await axios.post(`${API}/user/editBio`, {
            bio, 
            imageURL
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    }
);

export const followUser = createAsyncThunk(
    "profile/followUser",
    async ({profileId, token}) => {
        const response = await axios.post(`${API}/user/followUser/${profileId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("I ran");
        console.log(response.data);
        return response.data;
    }
);

export const savePost = createAsyncThunk(
    "user/savePost", 
    async ({token, postId}, {rejectWithValue}) => {
        console.log(`${API}/user/bookmarkPost/${postId}`);
        try {
            const response = await axios.post(`${API}/user/savePost/${postId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response);
            
            return response.data;
        } catch(error) {
            console.log({error});
            return rejectWithValue(error.response.data.message);
        }
    
    }
);

export const getSavedPosts = createAsyncThunk(
    "post/getBookmarkedPosts",
    async ({token}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API}/user/savedPosts`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            console.log("response", response);

            return response.data;
        } catch(error) {
            console.log(error);
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        status: "idle",
        userDetails: {},
        followingUsers: [],
        savedPosts: [],
        error: null
    },
    reducers: {},
    extraReducers: {
        [getUserDetails.pending]: (state) => {
            state.status = "loading"
        },
        [getUserDetails.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.userDetails = action.payload.user;
        },
        [getUserDetails.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        },

        [editBio.fulfilled]: (state, action) => {
            state.status = "bio updated";
            const { userDetails } = action.payload;
            console.log(userDetails);
        },

        [followUser.pending]: (state) => {
            state.status = "loading";
        },
        [followUser.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.userDetails.followersList = action.payload.followersList;
        },
        [followUser.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        },

        
        [savePost.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            let savedPost = action.payload.savedPost;

            state.savedPosts = savedPost.savedPosts
        },
        [savePost.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },

        [getSavedPosts.pending]: (state) => {
            state.status = "loading";
        },

        [getSavedPosts.fulfilled]: (state, action) => {
            state.status = "savedPostsFetched";
            console.log(action.payload);
            state.savedPosts = action.payload.savedPosts;
        },

        [getSavedPosts.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        }
    }
});

export default profileSlice.reducer;