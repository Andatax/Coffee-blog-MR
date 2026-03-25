import type { PayloadAction } from "@reduxjs/toolkit";
import type { User, UserState } from "../user.types";

export const userReducers = {
	setUser: (state: UserState, action: PayloadAction<User>) => {
		state.user = action.payload;
		state.isLoading = false;
		state.error = null;
	},
	clearUser: (state: UserState) => {
		state.user = null;
		state.isLoading = false;
		state.error = null;
	},
	setLoading: (state: UserState, action: PayloadAction<boolean>) => {
		state.isLoading = action.payload;
	},
	setError: (state: UserState, action: PayloadAction<string>) => {
		state.error = action.payload;
		state.isLoading = false;
	},
};
