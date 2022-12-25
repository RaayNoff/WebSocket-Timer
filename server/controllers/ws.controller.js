const wsService = require("../services/ws.service");

class WSController {
	handle(ws, req) {
		ws.on("message", (msg) => {
			try {
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

					case "ask-timer":
						wsService.onAskTimer(ws, body);
						break;

					default:
						console.log("Test");
						break;
				}
			} catch (error) {
				console.log(error);
			}
		});
		ws.on("close", (msg) => {
			try {
				const body = JSON.parse(msg);

				wsService.onClientLeave(ws, body);
			} catch (error) {
				console.log(error);
			}
		});
	}
}

module.exports = new WSController();
