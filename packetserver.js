"use strict";
exports.__esModule = true;
var http_1 = require("http");
var express = require("express");
var socketIO = require("socket.io");
var PacketServer = /** @class */ (function () {
    function PacketServer() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    PacketServer.prototype.createApp = function () {
        this.app = express();
    };
    PacketServer.prototype.createServer = function () {
        this.server = http_1.createServer(this.app);
    };
    PacketServer.prototype.config = function () {
        this.port = process.env.PORT || PacketServer.PORT;
    };
    PacketServer.prototype.sockets = function () {
        this.io = socketIO(this.server);
    };
    PacketServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log("Running server on port " + _this.port);
        });
        this.io.on('connect', function (socket) {
            console.log("Connected client on port " + _this.port);
            socket.on('message', function (m) {
                console.log("[server] " + JSON.stringify(m));
                _this.io.emit('message', m);
            });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    PacketServer.prototype.getApp = function () {
        return this.app;
    };
    PacketServer.PORT = 8000;
    return PacketServer;
}());
exports.PacketServer = PacketServer;
