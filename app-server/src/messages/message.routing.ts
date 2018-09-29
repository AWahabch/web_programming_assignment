import * as Hapi from "hapi";
import * as Joi from "joi";
import MessageController from "./message.controller";
import { MessageModel } from "./message.model";
import * as MessageValidator from "./message.validator";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../@configurations";

export default function (server: Hapi.Server, serverConfigs: IServerConfigurations, database: IDatabase) {

    const messageController = new MessageController(serverConfigs, database);
    server.bind(messageController);

    server.route({
        method: 'DELETE',
        path: '/messages',
        config: {
            handler: messageController.deleteMessage,
            auth: "jwt",
            tags: ['api', 'messages'],
            description: 'Delete message.',
        }
    });
    server.route({
        method: 'GET',
        path: '/messages/channel/{channelId}',
        config: {
            handler: messageController.listMessageByChannel,
            tags: ['api', 'messages'],
            description: 'Create a message.',
        }
    });
}