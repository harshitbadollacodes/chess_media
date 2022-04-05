import axios from "axios";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { API } from "../../constants/config";

export const getUserDetails = createAsyncThunk( 
    "profile/getUserDetails", 
    async (userId, {rejectWithValue}) => {        
        try {
            const response = await axios.get(`${API}/user/profile/${userId}`);
            return response.data;
        } catch(error) {
            console.log(error);
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const editBio = createAsyncThunk(
    "profile/editBio",
    async({bio, imageURL, token}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API}/user/editBio`, {
                bio, 
                imageURL
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            return response.data;
        } catch(error) {
            console.log(error);
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const followUser = createAsyncThunk(
    "profile/followUser",
    async ({profileId, token}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API}/user/followUser/${profileId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch(error) {
            console.log(error);
            return rejectWithValue(error.response.data.message);
        }
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
        profileStatus: "idle",
        userDetails: {},
        followingUsers: [],
        savedPosts: [],
        error: null
    },
    reducers: {},
    extraReducers: {
        [getUserDetails.pending]: (state) => {
            state.profileStatus = "loading"
        },
        [getUserDetails.fulfilled]: (state, action) => {
            state.profileStatus = "fulfilled";
            state.userDetails = action.payload.user;
        },
        [getUserDetails.rejected]: (state, action) => {
            state.profileStatus = "error";
            state.error = action.error.message;
        },

        [editBio.pending]: (state) => {
            state.profileStatus = "loading"
        },

        [editBio.fulfilled]: (state, action) => {
            state.profileStatus = "bio updated";
            const { userDetails } = action.payload;
            console.log(userDetails);
        },

        [followUser.pending]: (state) => {
            state.profileStatus = "load Spinner";
        },
        [followUser.fulfilled]: (state, action) => {
            state.profileStatus = "fulfilled";
            state.userDetails.followersList = action.payload.followersList;
        },
        [followUser.rejected]: (state, action) => {
            state.profileStatus = "rejected";
            state.error = action.error.message;
        },

        [savePost.pending]: (state, action) => {
            state.profileStatus = "load spinner";
        },
        
        [savePost.fulfilled]: (state, action) => {
            state.profileStatus = "fulfilled";
            let savedPost = action.payload.savedPost;

            state.savedPosts = savedPost.savedPosts
        },
        [savePost.rejected]: (state, action) => {
            state.profileStatus = "error";
            state.error = action.payload;
        },

        [getSavedPosts.pending]: (state) => {
            state.profileStatus = "loading";
        },

        [getSavedPosts.fulfilled]: (state, action) => {
            state.profileStatus = "savedPostsFetched";
            console.log(action.payload);
            state.savedPosts = action.payload.savedPosts;
        },

        [getSavedPosts.rejected]: (state, action) => {
            state.profileStatus = "error";
            state.error = action.payload;
        }
    }
});

export default profileSlice.reducer;