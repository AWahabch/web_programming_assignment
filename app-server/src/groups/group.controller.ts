import * as Hapi from "hapi";
import * as Boom from "boom";
import { IGroup } from "./group.model";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../@configurations";

export default class GroupController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.database = database;
        this.configs = configs;
    }

    public async createGroup(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model = request.payload;
        try {
            let group: any = await this.database.groupModel.create(model);
            return reply(group);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async updateGroup(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model: IGroup = request.payload;

        try {
            console.log(model);
            let group: IGroup = await this.database.groupModel.findByIdAndUpdate(model._id, model);
            group = await this.database.groupModel.findById(model._id);
            return reply(group);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async deleteGroup(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const id = request.params['id'];
            let group: IGroup = await this.database.groupModel.findByIdAndRemove(id);
            return reply();
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async infoGroup(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const id = request.params['id'];
            console.log(id);
            let group: IGroup = await this.database.groupModel.findById(id);

            reply(group);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async listGroup(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const groups = await this.database.groupModel.find({});
            var results = [];
            await Promise.all(groups.map(async (item) => {
                const channels = await this.database.channelModel.find({ "groupId": item._id }).sort({ name: 1 });
                results.push({
                    _id: item._id,
                    name: item.name,
                    channels: channels,
                });
            }));
            results = results.sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
            reply(results);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

}