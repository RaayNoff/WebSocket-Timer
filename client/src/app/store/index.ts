import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { biddingSlice } from "pages/home/model";

const rootReducer = combineReducers({
	bidding: biddingSlice.reducer,
});

export const createStore = () =>
	configureStore({
		reducer: rootReducer,
	});
