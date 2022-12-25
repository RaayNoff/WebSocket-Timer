/*
rooms structure: 
id: unique string for room id
timer: timer for room
clients: array of clients with their ids
*/

class WSStore {
	constructor() {
		this.rooms = [];
		this.intervals = [];
	}

	getRoomIndex(roomID) {
		return this.rooms.findIndex((r) => r.id === roomID);
	}

	getTimerCount(roomID) {
		return this.rooms.filter((r) => r.id === roomID)[0].timer.count || 120;
	}

	getTimer(roomID) {
		return this.intervals.filter((int) => int.roomID === roomID)[0];
	}

	createTimer(roomID) {
		const firstClient = this.rooms.filter((room) => room.id === roomID)[0]
			.clients[0];

		const timer = {
			id: roomID,
			count: 120,
			currentClient: firstClient,
		};

		const interval = setInterval(() => {
			const roomIndex = this.getRoomIndex(roomID);

			const timerCount = this.getTimerCount(roomID);
			if (timerCount === 0) {
				this.setNextClientToTimer(roomID);
			} else {
				this.rooms[roomIndex].timer.count = timerCount - 1;
			}
		}, 1000);

		this.intervals.push({
			roomID,
			interval,
		});

		return timer;
	}

	setNextClientToTimer(roomID) {
		const roomIndex = this.getRoomIndex(roomID);

		this.rooms[roomIndex].timer.count = 120;

		const currentClient = this.rooms[roomIndex].timer.currentClient;

		console.log("Clients: ", this.rooms[roomIndex].clients);

		const currentClientIndex = this.rooms[roomIndex].clients.findIndex(
			(cl) => cl === currentClient,
		);

		const nextClientIndex = currentClientIndex + 1;
		let nextClient = "";

		if (nextClientIndex > this.rooms[roomIndex].clients.length - 1) {
			nextClient = this.rooms[roomIndex].clients[0];
		} else {
			nextClient = this.rooms[roomIndex].clients[nextClientIndex];
		}

		this.rooms[roomIndex].currentClient = nextClient;
	}
}

module.exports = new WSStore();
