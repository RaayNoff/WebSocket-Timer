const aWss = require("../config").aWss;
const uuid = require("uuid");
const store = require("../store/ws.store");

class WSService {
	onConnection(ws) {
		ws.id = uuid.v4();
		ws.send(ws.id);
	}

	onStartedBidding(ws, body) {
		const room = body.room;
		store.rooms.push({
			id: room,
			clients: [
				{
					id: ws.id,
				},
			],
		});

		console.log(store.rooms);
	}
}

module.exports = new WSService();
