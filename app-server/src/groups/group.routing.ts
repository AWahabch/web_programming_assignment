import * as Hapi from "hapi";
import * as Joi from "joi";
import GroupController from "./group.controller";
import { GroupModel } from "./group.model";
import * as GroupValidator from "./group.validator";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../@configurations";

export default function (server: Hapi.Server, serverConfigs: IServerConfigurations, database: IDatabase) {

    const groupController = new GroupController(serverConfigs, database);
    server.bind(groupController);

    server.route({
        method: 'GET',
        path: '/groups/info/{id}',
        config: {
            handler: groupController.infoGroup,
            auth: "jwt",
            tags: ['api', 'groups'],
            description: 'Get group info.',
        }
    });

    server.route({
        method: 'GET',
        path: '/groups',
        config: {
            handler: groupController.listGroup,
            auth: "jwt",
            tags: ['api', 'groups'],
            description: 'Get group info.',
        }
    });

    server.route({
        method: 'DELETE',
        path: '/groups/{id}',
        config: {
            handler: groupController.deleteGroup,
            auth: "jwt",
            tags: ['api', 'groups'],
            description: 'Delete group.',
        }
    });

    server.route({
        method: 'PUT',
        path: '/groups',
        config: {
            handler: groupController.updateGroup,
            auth: "jwt",
            tags: ['api', 'groups'],
            description: 'Update group info.',
        }
    });

    server.route({
        method: 'POST',
        path: '/groups',
        config: {
            handler: groupController.createGroup,
            tags: ['api', 'groups'],
            description: 'Create a group.',
        }
    });
}