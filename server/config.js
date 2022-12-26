const express = require("express");
const WSExpress = require("express-ws");
const cors = require("cors");

class Config {
	constructor() {
		this.app = express();
		this.expressWs = WSExpress(this.app);
		this.aWss = this.expressWs.getWss();
		this.app.use(cors({}));
	}
}

module.exports = new Config();
