import axios from "axios";
import { API } from "../../constants/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadPostsData = createAsyncThunk(
    "posts/loadPostsData",
    async (token, {rejectWithValue}) => {    
        try{
            const response = await axios.get(`${API}/posts`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch(error) {
            console.log({error});
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const addPost = createAsyncThunk(
    "post/addPost",
    async ({token, postInput, imageURL}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API}/posts/new`, {
                postInput, 
                imageURL
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;    
        } catch(error) {
            console.log({error});
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const likeButtonClicked = createAsyncThunk(
    "posts/likeButtonClicked", 
    async ({token, postId}, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API}/posts/like/${postId}/`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch(error) {
        console.log({error});
        return rejectWithValue(error.response.data.message);
    }
    
});

export const savePost = createAsyncThunk(
    "posts/savePost", 
    async ({token, postId}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API}/posts/save/${postId}/`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch(error) {
            console.log({error});
            return rejectWithValue(error.response.data.message);
        }
    
    }
);

export const getPosts = createAsyncThunk(
    "posts/getPosts",
    async ({token, profileId}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API}/posts/getPosts/${profileId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
    
            return response.data;
        } catch(error) {
            console.log({error});
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const removePost = createAsyncThunk(
    "post/removePost",
    async ({token, postId}, {rejectWithValue}) => {
        try {
            console.log(token, postId);
            const response = await axios.post(`${API}/posts/removePost/${postId}`, {}, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            return response.data;
        } catch(error) {
            console.log({error});
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const postSlice = createSlice({
    name: "Post",
    initialState: {
        posts: [],
        status: "idle",
        error: null,
        userProfile: {},
        userPosts: []
    },
    reducers: {},

    extraReducers: {
        [loadPostsData.pending]: (state) => {
            state.status = "loading"
        },
        [loadPostsData.fulfilled]: (state, action) => {
            state.posts = action.payload.posts;
            state.status = "fulfilled";
        },
        [loadPostsData.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        },

        [addPost.pending]: (state) => {
            state.status = "loading";
        },
        [addPost.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.posts.unshift(action.payload.newPost);
        },
        [addPost.rejected]: (state, action) => {
            state.status = "error";
            console.log(action.error);
            state.error = action.error.message;
        },

        [likeButtonClicked.fulfilled]: (state, action) => {
            let updatedPost = action.payload.post
            state.status = "fulfilled";
            let findPost = state.posts.find(post => post._id === updatedPost._id);
            findPost.likes = updatedPost.likes;    
        },
        [likeButtonClicked.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        },

        [savePost.fulfilled]: (state, action) => {
            let updatedPost = action.payload.post
            state.status = "fulfilled";
            let findPost = state.posts.find(post => post._id === updatedPost._id);
            findPost.savedPosts = updatedPost.savedPosts;    
        },
        [savePost.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        },

        [getPosts.pending]: (state) => {
            state.status = "loading"
        },
        [getPosts.fulfilled]: (state, action) => {
            state.userPosts = action.payload.posts;
            state.status = "fulfilled";
        },
        [getPosts.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        },

    }

});

export default postSlice.reducer;