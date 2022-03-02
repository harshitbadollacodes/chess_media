import axios from "axios";
import { API } from "../../constants/config";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

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

export const editPost = createAsyncThunk(
    "posts/editPost",
    async ({token, postId, postInput, imageURL}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API}/posts/editPost/${postId}`, {
                postInput, 
                imageURL
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data;    
        } catch(error) {
            console.log({error});
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const addComment = createAsyncThunk(
    "post/addComment",
    async ({token, inputComment, postId}, {rejectWithValue}) => {
        console.log(inputComment, postId)
        try {
            const response = await axios.post(`${API}/posts/comment/${postId}`, {
                inputComment
            }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data;
        } catch(error) {
            console.log({error});
            return rejectWithValue(error.response.data.message);
        };
    }
);

export const removeComment = createAsyncThunk(
    "post/removeComment",
    async ({ token, commentId, postId }, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${API}/posts/removeComment/${postId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                },
                data: {
                    commentId
                }
            });
            console.log(response.data);
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
            state.error = action.payload;
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
            state.error = action.payload;
        },

        [likeButtonClicked.fulfilled]: (state, action) => {
            let updatedPost = action.payload.post
            state.status = "fulfilled";
            let findPost = state.posts.find(post => post._id === updatedPost._id);
            findPost.likes = updatedPost.likes;    
        },
        [likeButtonClicked.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },

        [savePost.fulfilled]: (state, action) => {
            let updatedPost = action.payload.post
            state.status = "fulfilled";
            let findPost = state.posts.find(post => post._id === updatedPost._id);
            findPost.savedPosts = updatedPost.savedPosts;
        },
        [savePost.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
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
            state.error = action.payload;
        },

        [removePost.fulfilled]: (state, action) => {
            state.status = "fulfilled"
            state.posts = state.posts.filter(post => post._id !== action.payload.post._id);
        },

        [removePost.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },

        [editPost.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            // state.posts = state.posts.map(post => post._id === action.payload.post._id 
            //     ? action.payload.post 
            //     : post
            // );
            console.log(action.payload.post._id);
            let findPost = state.posts.find(post => post._id === action.payload.post._id);
            console.log(current(findPost));
            findPost = action.payload.post
        },

        [addComment.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.posts = state.posts.map(post => post._id === action.payload.post._id 
                ? {...post, comments: action.payload.post.comments}
                : post
            );
        },

        [removeComment.fulfilled]: (state, action) => {
            state.status = "Comment Deleted";
            console.log(action.payload.post.comments);
            state.posts = state.posts.map(post => post._id === action.payload.post._id 
                ? {...post, comments: action.payload.post.comments}
                : post
            );
            
        }

    }

});

export default postSlice.reducer;