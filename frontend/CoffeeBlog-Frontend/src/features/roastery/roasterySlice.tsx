import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Roastery, RoasteryState } from "./interfaces";

const initialState: RoasteryState = {
	roastery: null,
	isLoading: false,
	error: null,
};

const roasterySlice = createSlice({
	name: "roastery",
	initialState,
	reducers: {
		setRoastery: (state, action: PayloadAction<Roastery>) => {
			(state.roastery = action.payload), (state.isLoading = false), (state.error = null);
		},
		clearRoastery: state => {
			(state.roastery = null), (state.isLoading = false), (state.error = null);
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = false;
		},
		setError: (state, action: PayloadAction<string>) => {
			(state.error = action.payload), (state.isLoading = false);
		},
	},
});

export const { setRoastery, clearRoastery, setLoading, setError } = roasterySlice.actions;
export default roasterySlice.reducer;
