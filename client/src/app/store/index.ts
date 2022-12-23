import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { biddingSlice } from "pages/bidding";

export const rootReducer = combineReducers({
	bidding: biddingSlice.reducer,
});

export const createStore = () =>
	configureStore({
		reducer: rootReducer,
	});
