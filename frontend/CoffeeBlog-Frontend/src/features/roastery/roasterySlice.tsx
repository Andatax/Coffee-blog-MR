import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Roastery {
	location: string;
	name: string;
}

interface roasteryState_ {
	roastery: Roastery | null;
	isLoading: boolean;
	error: string | null;
}
