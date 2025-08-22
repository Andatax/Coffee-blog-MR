import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface User{
    id:string;
    name:string;
    email:string;
    token:string;
}

const userSlice = createSlice({
    name:"user",
    initialState:{} as User,
    reducers:{}
})