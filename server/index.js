const config = require("./config");

const wsController = require("./controllers/ws.controller");

config.app.ws("/", wsController.handle);

const PORT = process.env.PORT || 8000;

config.app.listen(PORT, () => {
	console.log(`SERVER STARTED ON PORT: ${PORT}`);
});
