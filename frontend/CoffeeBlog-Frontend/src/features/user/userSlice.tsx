import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "./user.types";
import { userReducers } from "./reducers/userReducers";

const initialState: UserState = {
	user: null,
	isLoading: false,
	error: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		...userReducers,
	},
});
export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;

