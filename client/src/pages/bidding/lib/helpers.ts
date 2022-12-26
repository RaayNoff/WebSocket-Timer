import { Route } from "pages";

const getBiddingIDFromLocation = (location: Location) => {
	if (!location) return "";

	return location.pathname.replace(`${Route.BIDDING}/`, "");
};

const closeSocket = (ws: WebSocket) => {
	ws.close();
};

export { getBiddingIDFromLocation, closeSocket };
