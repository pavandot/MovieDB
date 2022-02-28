import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://api.themoviedb.org/3/authentication";

const session_id = localStorage.getItem("sessionId");

// Get the User
export const getUser = createAsyncThunk("auth/getUser", async (userData: { userName: string; password: string }) => {
	const tokenResponse = await axios.get(`${baseURL}/token/new?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}`);
	const token = tokenResponse.data.request_token;
	const userDataWithToken = {
		username: userData.userName,
		password: userData.password,
		request_token: token,
	};
	const verifyResponse = await axios.post(`${baseURL}/token/validate_with_login?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}`, userDataWithToken);
	const verifiedToken = verifyResponse.data.request_token;
	const sessionResponse = await axios.post(`${baseURL}/session/new?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}`, { request_token: verifiedToken });
	const sessionId = sessionResponse.data.session_id;
	localStorage.setItem("sessionId", sessionResponse.data.session_id);

	return axios.get(`https://api.themoviedb.org/3/account?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&session_id=${sessionId}`).then((response) => {
		return response.data;
	});
});

// Get the User with sessionId
export const getUserWithSessionId = createAsyncThunk("auth/getUserWithSessionId", async (sessionId: string) => {
	if (sessionId) {
		return axios.get(`https://api.themoviedb.org/3/account?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&session_id=${sessionId}`).then((response) => {
			return response.data;
		});
	}
});

type InitialStateType = {
	isAuthenticated: boolean;
	user: object | null;
	sessionId: string | null;
	error: string | null;
	isLoading: boolean;
};

// initialState of the authSlice
const initialState: InitialStateType = {
	isAuthenticated: false,
	user: null,
	sessionId: session_id ? session_id : "",
	error: "",
	isLoading: false,
};

// Auth Slice
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logOut: (state) => {
			localStorage.removeItem("sessionId");
			state.isAuthenticated = false;
			state.user = {};
			state.sessionId = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		// Case for Get User
		builder
			.addCase(getUser.pending, (state, action) => {
				state.isAuthenticated = false;
				state.user = null;
				state.sessionId = null;
				state.error = null;
				state.isLoading = true;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.user = action.payload;
				state.sessionId = localStorage.getItem("sessionId");
				state.error = null;
				state.isLoading = false;
			})
			.addCase(getUser.rejected, (state, action: any) => {
				let errorMessage = "";
				if (action.error.message.includes("401")) {
					errorMessage = "Invalid Credentials";
				}
				state.isAuthenticated = false;
				state.user = null;
				state.sessionId = null;
				state.error = errorMessage;
				state.isLoading = false;
			});

		// Case for Get User with sessionId
		builder
			.addCase(getUserWithSessionId.pending, (state, action) => {
				state.isAuthenticated = false;
				state.user = null;
				state.sessionId = null;
				state.error = null;
				state.isLoading = true;
			})
			.addCase(getUserWithSessionId.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.user = action.payload;
				state.sessionId = localStorage.getItem("sessionId");
				state.error = null;
				state.isLoading = false;
			})
			.addCase(getUserWithSessionId.rejected, (state, action: any) => {
				localStorage.removeItem("sessionId");
				state.isAuthenticated = false;
				state.user = null;
				state.sessionId = null;
				state.error = action.error.message;
				state.isLoading = false;
			});
	},
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
