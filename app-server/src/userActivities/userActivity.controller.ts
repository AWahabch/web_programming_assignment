import * as Hapi from "hapi";
import * as Boom from "boom";
import { IUserActivity } from "./userActivity.model";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../@configurations";

export default class UserActivityController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.database = database;
        this.configs = configs;
    }

    public async createUserActivity(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model = request.payload;
        try {
            let userActivity: any = await this.database.userActivityModel.create(model);
            return reply(userActivity);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async listUserActivitysByUser(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const userId = request.params['userId'];
            const userActivities = await this.database.userActivityModel.find({"userId": userId});
            reply(userActivities);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async listUserActivitysByChannel(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const channelId = request.params['channelId'];
            const userActivities = await this.database.userActivityModel.find({"channelId": channelId});
            reply(userActivities);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

}