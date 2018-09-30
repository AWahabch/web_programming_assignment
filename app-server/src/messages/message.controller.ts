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

    public async createMessageFromSocket(userId, channelId, type, content) {
        const model = {
            userId,
            channelId,
            type,
            content
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
            var results = [];
            await Promise.all(messages.map(async (item) => {
                var user = await this.database.userModel.findById(item.userId);
                results.push({
                    _id: item._id,
                    type: item.type,
                    content: item.content,
                    user:{
                        id: user._id,
                        email: user.email,
                        username: user.username,
                        imageUrl: user.imageUrl
                    }
                });
            }));
            reply(results);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }
}