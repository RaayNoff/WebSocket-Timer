import { API_WS_URL } from "shared";

import { createSocketHandlers } from "../config/biddingEvents";

export const openSocket = (roomID: string) => (dispatch: AppDispatch) => {
	try {
		createSocketHandlers(new WebSocket(API_WS_URL), roomID, dispatch);
	} catch (error) {
		console.log(error);
	}
};
