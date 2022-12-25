declare type WSMessage = {
	[key: string | number]: string | number;
	method:
		| "connection"
		| "start-bidding"
		| "enter-bidding"
		| "client-leave"
		| "ask-timer";
};

declare type Timer = {
	id: string;
	count: number;
	currentClient: string;
};

declare type WSMessageType =
	| "started-bidding"
	| "connected"
	| "error"
	| "entered-bidding"
	| "update-clients"
	| "update-timer";

declare type WSStartedBiddingMessage = {
	message: WSMessageType;
	isCreated: boolean;
	roomID: string;
	clients: string[];
	timer: Timer;
};

declare type WSConnectedMessage = {
	message: WSMessageType;
	clientID: string;
};

declare type WSErrorMessage = {
	message: WSMessageType;
	content: string;
};

declare type WSEnteredBiddingMessage = {
	message: WSMessageType;
	clients: string[];
	roomID: string;
	timer: Timer;
};

declare type WSUpdateClientsMessage = {
	message: WSMessageType;
	clients: string[];
};

declare type WSUpdateTimerMessage = {
	message: WSMessageType;
	timer: Timer;
};
