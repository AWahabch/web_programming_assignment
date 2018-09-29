import * as Hapi from "hapi";
import * as Joi from "joi";
import UserActivityController from "./userActivity.controller";
import { UserActivityModel } from "./userActivity.model";
import * as UserActivityValidator from "./userActivity.validator";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../@configurations";

export default function (server: Hapi.Server, serverConfigs: IServerConfigurations, database: IDatabase) {

    const userActivityController = new UserActivityController(serverConfigs, database);
    server.bind(userActivityController);

    server.route({
        method: 'GET',
        path: '/userActivities/channel/{channelId}',
        config: {
            handler: userActivityController.listUserActivitysByChannel,
            auth: "jwt",
            tags: ['api', 'userActivities'],
            description: 'Get userActivity info.',
        }
    });

    server.route({
        method: 'GET',
        path: '/userActivities/user/{userId}',
        config: {
            handler: userActivityController.listUserActivitysByUser,
            auth: "jwt",
            tags: ['api', 'userActivities'],
            description: 'Get userActivity info.',
        }
    });

    server.route({
        method: 'POST',
        path: '/userActivities',
        config: {
            handler: userActivityController.createUserActivity,
            tags: ['api', 'userActivities'],
            description: 'Create a userActivity.',
        }
    });
}