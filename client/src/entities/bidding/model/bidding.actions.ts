import { API_WS_URL } from "shared";

import { handleSocket } from "../lib/handleSocket";

import { biddingSlice } from "./bidding.slice";

export const openSocket =
	(roomID: string, isConnect: boolean) => (dispatch: AppDispatch) => {
		try {
			handleSocket(new WebSocket(API_WS_URL), roomID, dispatch, isConnect);
		} catch (error) {
			console.log(error);
		}
	};

export const setIsCreated = (condition: boolean) => (dispatch: AppDispatch) => {
	dispatch(biddingSlice.actions.setIsCreated(condition));
};

export const setwillConnect =
	(condition: boolean) => (dispatch: AppDispatch) => {
		dispatch(biddingSlice.actions.setwillConnect(condition));
	};

export const resetState = () => (dispatch: AppDispatch) => {
	dispatch(biddingSlice.actions.resetState());
};

export const setWebSocket = (ws: WebSocket) => (dispatch: AppDispatch) => {
	dispatch(biddingSlice.actions.setWebSocket(ws));
};
