import { API_WS_URL } from "shared";

import { handleSocket } from "../lib/handleSocket";

import { biddingSlice } from "./bidding.slice";

export const openSocket =
	(roomID: string, isConnect = false) =>
	(dispatch: AppDispatch) => {
		try {
			handleSocket(new WebSocket(API_WS_URL), roomID, dispatch, isConnect);
		} catch (error) {
			console.log(error);
		}
	};

export const setIsCreated = (condition: boolean) => (dispatch: AppDispatch) => {
	dispatch(biddingSlice.actions.setIsCreated(condition));
};

export const setWillBeCreated =
	(condition: boolean) => (dispatch: AppDispatch) => {
		dispatch(biddingSlice.actions.setWillBeCreated(condition));
	};
