var Handlers = require('./handlers');
import * as Hapi from "hapi";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../@configurations";

export function init(server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {

    var io = require('socket.io')(server.select('chat').listener);
    io.on('connection', function (socket) {
        // console.log('New connection!');
        var _io = socket;
        socket.on('message', function (message) {
            Handlers.message(configs, database, _io, message);
        });
    });

}