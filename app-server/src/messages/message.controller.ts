import * as Hapi from "hapi";
import * as Boom from "boom";
import { IMessage } from "./message.model";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../@configurations";

export default class MessageController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.database = database;
        this.configs = configs;
    }

    public async createMessageFromSocket(userId, channelId, content, image) {
        const model = {
            userId,
            channelId,
            content,
            image
        };
        try {
            let message: any = await this.database.messageModel.create(model);
            return message;
        } catch (error) {
            console.log(error);
        }
    }

    public async deleteMessage(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const id = request.payload['_id'];
            let message: IMessage = await this.database.messageModel.findByIdAndRemove(id);
            return reply();
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async listMessageByChannel(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const channelId = request.params['channelId'];
            const messages = await this.database.messageModel.find({ "channelId": channelId });
            reply(messages);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }
}