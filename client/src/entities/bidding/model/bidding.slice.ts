import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IBiddingState {
	isCreated: boolean;
	error: null | string;
	currentRoomID: string | null;
	clientID: string | null;
	clientsList: string[];
	willConnect: boolean;
	timer: Timer | null;
	webSocket: WebSocket | null;
}

const initialState: IBiddingState = {
	isCreated: false,
	error: null,
	currentRoomID: null,
	clientID: null,
	clientsList: [],
	willConnect: false,
	timer: null,
	webSocket: null,
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
		setwillConnect: (state, action: PayloadAction<boolean>) => {
			state.willConnect = action.payload;
		},
		setTimer: (state, action: PayloadAction<Timer>) => {
			state.timer = action.payload;
		},
		setWebSocket: (state, action: PayloadAction<WebSocket>) => {
			state.webSocket = action.payload;
		},
		resetState: (state) => {
			state.clientID = null;
			state.clientsList = [];
			state.currentRoomID = null;
			state.error = null;
			state.isCreated = false;
			state.timer = null;
			state.willConnect = false;
		},
	},
});
