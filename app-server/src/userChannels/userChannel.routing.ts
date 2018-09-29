import * as Hapi from "hapi";
import * as Joi from "joi";
import UserChannelController from "./userChannel.controller";
import { UserChannelModel } from "./userChannel.model";
import * as UserChannelValidator from "./userChannel.validator";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../@configurations";

export default function (server: Hapi.Server, serverConfigs: IServerConfigurations, database: IDatabase) {

    const userChannelController = new UserChannelController(serverConfigs, database);
    server.bind(userChannelController);

    server.route({
        method: 'GET',
        path: '/userChannels/channel/{channelId}',
        config: {
            handler: userChannelController.listUserChannelsByChannel,
            auth: "jwt",
            tags: ['api', 'userChannels'],
            description: 'Get userChannel info.',
        }
    });

    server.route({
        method: 'GET',
        path: '/userChannels/user/{userId}',
        config: {
            handler: userChannelController.listUserChannelsByUser,
            auth: "jwt",
            tags: ['api', 'userChannels'],
            description: 'Get userChannel info.',
        }
    });

    server.route({
        method: 'DELETE',
        path: '/userChannels',
        config: {
            handler: userChannelController.deleteUserChannel,
            auth: "jwt",
            tags: ['api', 'userChannels'],
            description: 'Delete userChannel.',
        }
    });

    server.route({
        method: 'PUT',
        path: '/userChannels',
        config: {
            handler: userChannelController.updateUserChannel,
            auth: "jwt",
            tags: ['api', 'userChannels'],
            description: 'Update userChannel info.',
        }
    });

    server.route({
        method: 'POST',
        path: '/userChannels',
        config: {
            handler: userChannelController.createUserChannel,
            tags: ['api', 'userChannels'],
            description: 'Create a userChannel.',
        }
    });
}