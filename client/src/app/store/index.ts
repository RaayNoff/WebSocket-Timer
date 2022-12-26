import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { biddingSlice } from "entities/bidding";

export const rootReducer = combineReducers({
	bidding: biddingSlice.reducer,
});

export const createStore = () =>
	configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}),
	});
