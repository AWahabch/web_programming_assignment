import * as Hapi from "hapi";
import * as Joi from "joi";
import ChannelController from "./channel.controller";
import { ChannelModel } from "./channel.model";
import * as ChannelValidator from "./channel.validator";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../@configurations";

export default function (server: Hapi.Server, serverConfigs: IServerConfigurations, database: IDatabase) {

    const channelController = new ChannelController(serverConfigs, database);
    server.bind(channelController);

    server.route({
        method: 'GET',
        path: '/channels/info/{id}',
        config: {
            handler: channelController.infoChannel,
            auth: "jwt",
            tags: ['api', 'channels'],
            description: 'Get channel info.',
        }
    });

    server.route({
        method: 'GET',
        path: '/channels/group/{groupId}',
        config: {
            handler: channelController.listChannelByGroup,
            auth: "jwt",
            tags: ['api', 'channels'],
            description: 'Get channel by channel.',
        }
    });

    server.route({
        method: 'GET',
        path: '/channels',
        config: {
            handler: channelController.listChannel,
            auth: "jwt",
            tags: ['api', 'channels'],
            description: 'Get channel info.',
        }
    });

    server.route({
        method: 'DELETE',
        path: '/channels/{id}',
        config: {
            handler: channelController.deleteChannel,
            auth: "jwt",
            tags: ['api', 'channels'],
            description: 'Delete channel.',
        }
    });

    server.route({
        method: 'PUT',
        path: '/channels',
        config: {
            handler: channelController.updateChannel,
            auth: "jwt",
            tags: ['api', 'channels'],
            description: 'Update channel info.',
        },
    });

    server.route({
        method: 'POST',
        path: '/channels',
        config: {
            handler: channelController.createChannel,
            auth: "jwt",
            validate: {
                payload: ChannelValidator.createChannelModel,
            },
            tags: ['api', 'channels'],
            description: 'Create a channel.',
        }
    });
}