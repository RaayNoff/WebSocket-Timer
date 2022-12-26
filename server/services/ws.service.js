const aWss = require("../config").aWss;
const uuid = require("uuid");
const store = require("../store/ws.store");

class WSService {
	onConnection(ws) {
		ws.id = uuid.v4().toString();
		ws.send(
			JSON.stringify({
				message: "connected",
				clientID: ws.id,
			}),
		);
	}

	onStartedBidding(ws, body) {
		const roomID = body.roomID;

		const createdRoom = store.rooms.filter((r) => r.id === roomID)[0];

		if (createdRoom) {
			ws.send(
				JSON.stringify({
					message: "error",
					content: "You trying to create room that has been created",
				}),
			);
			return;
		}

		store.rooms.push({
			id: roomID,
			clients: [ws.id],
		});

		store.rooms[store.getRoomIndex(roomID)].timer = store.createTimer(roomID);

		console.log(`Client started bidding:\t${roomID}\t|\tClient ID: ${ws.id}`);
		console.log(`List of clients: \t ${store.rooms[0].clients}`);

		ws.room = roomID;
		ws.send(
			JSON.stringify({
				message: "started-bidding",
				roomID,
				clients: store.rooms.filter((r) => r.id === roomID)[0].clients,
				timer: store.rooms.filter((r) => r.id === roomID)[0].timer,
			}),
		);
	}

	onEnterBidding(ws, body) {
		const roomID = body.roomID;

		const roomIndex = store.getRoomIndex(roomID);

		if (roomIndex < 0) {
			ws.send(
				JSON.stringify({
					message: "error",
					content: "There is no room with matching ID",
				}),
			);
			return;
		}

		store.rooms[roomIndex].clients.push(ws.id); // Adding new client to store

		ws.room = roomID;
		ws.send(
			JSON.stringify({
				message: "entered-bidding",
				clients: store.rooms[roomIndex].clients,
				roomID,
				timer: store.rooms[roomIndex].timer,
			}),
		);

		this.updateClientsInRoom(store.rooms[roomIndex].clients);
	}

	onClientLeave(ws, body) {
		const roomID = ws.room;
		const roomIndex = store.getRoomIndex(roomID);

		const currentClients = store.rooms[roomIndex].clients;
		store.rooms[roomIndex].clients = currentClients.filter((cl) => cl !== ws.id);

		const clientsCount = store.rooms[roomIndex].clients.length;
		if (!clientsCount) {
			console.log(`No more clients in ${roomID} room, deleting...`);

			const roomInterval = store.intervals.filter(
				(int) => int.roomID === roomID,
			)[0];
			clearInterval(roomInterval.interval);

			store.intervals = store.intervals.filter((int) => int.roomID !== roomID);
			store.rooms = store.rooms.filter((room) => roomID !== room.id);
		} else {
			const isLeavingClientOnTimer =
				ws.id === store.rooms.filter((r) => r.id === roomID)[0].timer.currentClient;

			if (isLeavingClientOnTimer) store.setNextClientToTimer(roomID);

			this.updateClientsInRoom(store.rooms[roomIndex].clients);

			this.updateTimer(
				store.rooms[roomIndex].clients,
				store.rooms[roomIndex].timer,
			);
		}
	}

	onAskTimer(ws, body) {
		const roomID = body.roomID;

		ws.send(
			JSON.stringify({
				message: "update-timer",
				timer: store.rooms.filter((r) => r.id === roomID)[0].timer,
			}),
		);
	}

	updateClientsInRoom(currentClients) {
		aWss.clients.forEach((cl) => {
			currentClients?.forEach((curCl) => {
				if (curCl === cl.id)
					cl.send(
						JSON.stringify({
							message: "update-clients",
							clients: currentClients,
						}),
					);
			});
		});
	}

	updateTimer(currentClients, timer) {
		aWss.clients.forEach((cl) => {
			currentClients?.forEach((curCl) => {
				if (curCl === cl.id)
					cl.send(
						JSON.stringify({
							message: "update-timer",
							timer,
						}),
					);
			});
		});
	}
}

module.exports = new WSService();
