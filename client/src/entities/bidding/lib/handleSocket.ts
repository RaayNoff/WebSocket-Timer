import { biddingSlice } from "../model";

export const handleSocket = (
	ws: WebSocket,
	roomID: string,
	dispatch: AppDispatch,
	isConnect: boolean,
) => {
	let interval: NodeJS.Timer;

	ws.onopen = (e) => {
		ws.send(
			JSON.stringify({
				method: "connection",
			} as WSMessage),
		);

		if (isConnect) {
			ws.send(
				JSON.stringify({
					method: "enter-bidding",
					roomID,
				} as WSMessage),
			);
		} else {
			ws.send(
				JSON.stringify({
					method: "start-bidding",
					roomID,
				} as WSMessage),
			);
		}

		interval = setInterval(() => {
			ws.send(
				JSON.stringify({
					method: "ask-timer",
					roomID,
				} as WSMessage),
			);
		}, 250);
	};

	ws.onmessage = (e) => {
		const data = JSON.parse(e.data);
		const messageType = data.message as WSMessageType;

		if (messageType === "connected") {
			const { clientID } = data as WSConnectedMessage;

			console.log(`Server assigned an ID: ${clientID}`);
			dispatch(biddingSlice.actions.setClientID(clientID));
			dispatch(biddingSlice.actions.setWebSocket(ws));
		}

		if (messageType === "error") {
			const { content: errorMsg } = data as WSErrorMessage;
			if (interval) clearInterval(interval);

			console.error(errorMsg);
			dispatch(biddingSlice.actions.setError(errorMsg));
		}

		if (messageType === "started-bidding") {
			const { roomID, clients, timer } = data as WSStartedBiddingMessage;

			console.log("Room registred by ID: ", roomID);
			console.log("Clients: ", clients);
			dispatch(biddingSlice.actions.setIsCreated(true));
			dispatch(biddingSlice.actions.setClientsList(clients));
			dispatch(biddingSlice.actions.setTimer(timer));
		}

		if (messageType === "entered-bidding") {
			const { clients, roomID, timer } = data as WSEnteredBiddingMessage;

			console.log(`Entered bidding with ID: ${roomID}`);
			console.log("Clients", clients);

			dispatch(biddingSlice.actions.setClientsList(clients));
			dispatch(biddingSlice.actions.setTimer(timer));
			dispatch(biddingSlice.actions.setwillConnect(false));
		}

		if (messageType === "update-clients") {
			const { clients } = data as WSUpdateClientsMessage;

			console.log("Server updated list of clients");
			console.log("Client list:", clients);

			dispatch(biddingSlice.actions.setClientsList(clients));
		}

		if (messageType === "update-timer") {
			const { timer } = data as WSUpdateTimerMessage;

			dispatch(biddingSlice.actions.setTimer(timer));
		}
	};

	ws.onclose = (e) => {
		if (interval) clearInterval(interval);

		console.log("Server has closed connection");
	};
};
