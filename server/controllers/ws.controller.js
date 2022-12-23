const wsService = require("../services/ws.service");

class WSController {
	onMessage(ws, req) {
		ws.on("message", (msg) => {
			const body = JSON.parse(msg);

			switch (body.method) {
				case "connection":
					wsService.onConnection(ws);
					break;

				case "start-bidding":
					wsService.onStartedBidding(ws, body);
					break;

				case "enter-bidding":
					wsService.onEnterBidding(ws, body);
					break;

				default:
					console.log("Test");
					break;
			}
		});
	}
}

module.exports = new WSController();
