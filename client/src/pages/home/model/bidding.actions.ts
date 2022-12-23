import { API_WS_URL } from "shared";

export const openSocket = () => (dispatch: AppDispatch) => {
	try {
		const ws = new WebSocket(API_WS_URL);
	} catch (error) {
		console.log(error);
	}
};
