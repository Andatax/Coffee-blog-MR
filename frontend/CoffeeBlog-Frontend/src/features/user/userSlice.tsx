import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { User, UserState } from "./interfaces";

const initialState: UserState = {
	user: null,
	isLoading: false,
	error: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.isLoading = false;
			state.error = null;
		},
		clearUser: state => {
			state.user = null;
			state.isLoading = false;
			state.error = null;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});
export const { setUser, clearUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;

