import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IBiddingState {
	isCreated: boolean;
	error: null | string;
	currentRoomID: string | null;
	clientID: string | null;
	clientsList: string[];
	willBeCreated: boolean;
	timer: Timer | null;
}

const initialState: IBiddingState = {
	isCreated: false,
	error: null,
	currentRoomID: null,
	clientID: null,
	clientsList: [],
	willBeCreated: true,
	timer: null,
};

export const biddingSlice = createSlice({
	name: "bidding",
	initialState,
	reducers: {
		setIsCreated: (state, action: PayloadAction<boolean>) => {
			state.isCreated = action.payload;
			state.error = null;
		},
		setClientID: (state, action: PayloadAction<string>) => {
			state.clientID = action.payload;
		},
		setClientsList: (state, action: PayloadAction<string[]>) => {
			state.clientsList = action.payload;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		setWillBeCreated: (state, action: PayloadAction<boolean>) => {
			state.willBeCreated = action.payload;
		},
		setTimer: (state, action: PayloadAction<Timer>) => {
			state.timer = action.payload;
		},
	},
});
