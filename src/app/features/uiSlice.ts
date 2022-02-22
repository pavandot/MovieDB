import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
	progressBar: {
		percentage: 0,
		isLoader: false,
	},
};

export const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setProgressBar: (state, action) => {
			state.progressBar.percentage = action.payload;
			if (action.payload === 90) {
				state.progressBar.isLoader = false;
			} else {
				state.progressBar.isLoader = true;
			}
		},
	},
});

export const { setProgressBar } = uiSlice.actions;
export default uiSlice.reducer;
