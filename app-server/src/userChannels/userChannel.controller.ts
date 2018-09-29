import * as Hapi from "hapi";
import * as Boom from "boom";
import { IUserChannel } from "./userChannel.model";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../@configurations";

export default class UserChannelController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.database = database;
        this.configs = configs;
    }

    public async createUserChannel(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model = request.payload;
        try {
            let userChannel: any = await this.database.userChannelModel.create(model);
            return reply(userChannel);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async updateUserChannel(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model: IUserChannel = request.payload;

        try {
            let userChannel: IUserChannel = await this.database.userChannelModel.findByIdAndUpdate(model._id, model);
            userChannel = await this.database.userChannelModel.findById(model._id);
            return reply(userChannel);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async deleteUserChannel(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const id = request.payload['_id'];
            let userChannel: IUserChannel = await this.database.userChannelModel.findByIdAndRemove(id);
            return reply();
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async listUserChannelsByUser(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const userId = request.params['userId'];
            const userChannels = await this.database.userChannelModel.find({"userId": userId});
            reply(userChannels);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async listUserChannelsByChannel(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const channelId = request.params['channelId'];
            const userChannels = await this.database.userChannelModel.find({"channelId": channelId});
            reply(userChannels);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

}