"use strict";
exports.__esModule = true;
var packetserver_1 = require("./packetserver");
var app = new packetserver_1.PacketServer().getApp();
exports.app = app;
