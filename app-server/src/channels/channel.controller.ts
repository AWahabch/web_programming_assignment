import * as Hapi from "hapi";
import * as Boom from "boom";
import { IChannel } from "./channel.model";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../@configurations";

export default class ChannelController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.database = database;
        this.configs = configs;
    }

    public async createChannel(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model = request.payload;
        try {
            let channel: any = await this.database.channelModel.create(model);
            return reply(channel);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async updateChannel(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model: IChannel = request.payload;

        try {
            console.log(model);
            let channel: IChannel = await this.database.channelModel.findByIdAndUpdate(model._id, model);
            channel = await this.database.channelModel.findById(model._id);
            return reply(channel);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async deleteChannel(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const id = request.payload['_id'];
            let channel: IChannel = await this.database.channelModel.findByIdAndRemove(id);
            return reply();
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async infoChannel(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const id = request.params['id'];
            console.log(id);
            let channel: IChannel = await this.database.channelModel.findById(id);

            reply(channel);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async getChannelById(id) {
        const channel: IChannel = await this.database.channelModel.findById(id);
        return channel;
    }

    public async listChannel(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const channels = await this.database.channelModel.find({});
            var results = [];
            await Promise.all(channels.map(async (item) => {
                var group = await this.database.groupModel.findById(item.groupId);
                results.push({
                    _id: item._id,
                    name: item.name,
                    groupId: item.groupId,
                    groupName: group.name
                });
            }));
            reply(results);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async listChannelByGroup(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const groupId = request.params['groupId'];
            const channels = await this.database.channelModel.find({ "groupId": groupId });
            reply(channels);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

}