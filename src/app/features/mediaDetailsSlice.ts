import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMediaDetails = createAsyncThunk("auth/getIsFavorite", async (payLoad: { mediaId: number; mediaType: string }) => {
	const sessionId = localStorage.getItem("sessionId");
	const url = `https://api.themoviedb.org/3/${payLoad.mediaType}/${payLoad.mediaId}/account_states?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&session_id=${sessionId}`;
	return axios.get(url).then((response) => {
		return response.data;
	});
});

export const toggleFavorites = createAsyncThunk("auth/toggleFavorites", async (body: { media_type: string; media_id: number; watchlist: boolean }) => {
	const sessionId = localStorage.getItem("sessionId");
	const url = `https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&session_id=${sessionId}`;
	return axios.post(url, body).then((response) => {
		console.log(response.data);

		return response.data;
	});
});

export const toggleWatchList = createAsyncThunk("auth/toggleWatchList", async (body: { media_type: string; media_id: number; watchlist: boolean }) => {
	const sessionId = localStorage.getItem("sessionId");
	const url = `https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&session_id=${sessionId}`;
	return axios.post(url, body).then((response) => {
		console.log(response.data);

		return response.data;
	});
});

type InitialStateType = {
	isFavorite: boolean;
	isLoading: boolean;
	isWatchlist: boolean;
	error: string | any;
};

const mediaDetails = createSlice({
	name: "toggleFavorites",
	initialState: {
		isLoading: false,
		error: "",
		isFavorite: false,
		isWatchlist: false,
	} as InitialStateType,
	reducers: {
		clearIsFavorite: (state) => {
			state.isFavorite = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMediaDetails.pending, (state, action) => {
				state.isLoading = true;
				state.error = "";
			})
			.addCase(fetchMediaDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = "";
				state.isFavorite = action.payload.favorite;
				state.isWatchlist = action.payload.watchlist;
			})
			.addCase(fetchMediaDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
		builder.addCase(toggleFavorites.fulfilled, (state, action) => {
			state.isFavorite = !state.isFavorite;
		});
		builder.addCase(toggleWatchList.fulfilled, (state, action) => {
			state.isWatchlist = !state.isWatchlist;
		});
	},
});

export const { clearIsFavorite } = mediaDetails.actions;

export default mediaDetails.reducer;
