import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    async({bio, token}) => {
        const response = await axios.post(`${API}/user/editBio`, {
            bio
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

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        status: "idle",
        userDetails: {},
        followingUsers: [],
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
            const { userDetails } = action.payload;
            console.log(userDetails);
            state.status = "fulfilled";
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
        }

    }
});

export default profileSlice.reducer;