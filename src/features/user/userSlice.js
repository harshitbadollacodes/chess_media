import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/config";

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async({email, password}) => {
        const response = await axios.post(`${API}/user/login`, {
            email, 
            password
        });

        return response.data
    }
);

export const signUpUser = createAsyncThunk(
    "user/signUpUser",
    async({firstName, lastName, username, email, password}) => {
        const response = await axios.post(`${API}/user/signup`, {
            firstName, 
            lastName,
            username,
            email, 
            password
        });

        return response.data;
    }
)

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers", 
    async() => {
        const response = await axios.get(`${API}/user/allUsers`);
        return response.data;
    }
);

const userId = JSON.parse(localStorage.getItem("userId")) || null;
const username = JSON.parse(localStorage.getItem("username")) || null;
const firstName = JSON.parse(localStorage.getItem("firstName")) || null;
const token = JSON.parse(localStorage.getItem("token")) || null;
const lastName = JSON.parse(localStorage.getItem("lastName") || null);

export const userSlice = createSlice({
    name: "user",
    initialState: {
        status: "idle",
        isUserLoggedIn: false,
        userId,
        firstName,
        lastName,
        username,
        token,
        error: null,
        allUsers: []
    },

    reducers: {
        logoutUser: () => {
            localStorage.removeItem("isUserLoggedIn");
            localStorage.removeItem("firstName");
            localStorage.removeItem("lastName");
            localStorage.removeItem("username")
            localStorage.removeItem("userId");
            localStorage.removeItem("token");

            return {
                status: "idle",
                isUserLoggedIn: false,
                userId: null,
                username: null,
                token: null,
                error: null
            }
        },

        resetAuthStatus: (state) => {
            state.status = "idle";
            state.error = null;
        },

    },

    extraReducers: {
        [loginUser.pending]: (state) => {
            state.status = "loading";
        },

        [loginUser.fulfilled]: (state, action) => {
            const { userId, firstName, lastName, username, token } = action.payload;
            localStorage.setItem("userId", JSON.stringify(userId));
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem("firstName", JSON.stringify(firstName));
            localStorage.setItem("lastName", JSON.stringify(lastName));
            localStorage.setItem("username", JSON.stringify(username));
            localStorage.setItem("isUserLoggedIn", JSON.stringify(true));

            state.userId = userId;
            state.token = token;
            state.username = username;
            state.firstName = firstName;
            state.lastName = lastName;
            state.status = "tokenFetched";
            state.isUserLoggedIn = true;
        },

        [loginUser.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        },

        [signUpUser.pending]: (state) => {
            state.status = "loading";
        },

        [signUpUser.fulfilled]: (state, action) => {
            const { userId, firstName, username, token } = action.payload;

            localStorage.setItem("userId", JSON.stringify(userId));
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem("firstName", JSON.stringify(firstName));
            localStorage.setItem("username", JSON.stringify(username));
            localStorage.setItem("isUserLoggedIn", JSON.stringify(true));

            state.userId = userId;
            state.token = token;
            state.username = username;
            state.firstName = firstName;
            state.status = "tokenFetched";
            state.isUserLoggedIn = true;
        },

        [signUpUser.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        },

        [getAllUsers.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.allUsers = action.payload.allUsers;
        },

    }
});

export const { logoutUser, resetAuthStatus } = userSlice.actions;

export default userSlice.reducer