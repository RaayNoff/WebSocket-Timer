const express = require("express");
const WSExpress = require("express-ws");

class Config {
	constructor() {
		this.app = express();
		this.expressWs = WSExpress(this.app);
		this.aWss = this.expressWs.getWss();
	}
}

module.exports = new Config();
