const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);

app.ws("/", (ws, req) => {
	ws.on("message", (msg) => {
		try {
			const msgBody = JSON.parse(msg);
			console.log(msgBody);
		} catch (error) {
			console.error(
				'======== Cannot handle ws.on("message") event ========\n',
				error,
			);
		}
	});
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`SERVER STARTED ON PORT: ${PORT}`);
});
