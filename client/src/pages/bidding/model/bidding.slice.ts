import { createSlice } from "@reduxjs/toolkit";

interface IBiddingState {
	isLoading: false;
	error: null | string;
	currentRoomID: string | null;
}

const initialState: IBiddingState = {
	isLoading: false,
	error: null,
	currentRoomID: null,
};

export const biddingSlice = createSlice({
	name: "bidding",
	initialState,
	reducers: {},
});
