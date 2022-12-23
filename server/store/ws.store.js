/*
rooms structure: 
id: unique string for room id
timer: timer for room
clients: array of clients with their ids
*/

class WSStore {
	constructor() {
		this.rooms = [];
	}
}

module.exports = new WSStore();
