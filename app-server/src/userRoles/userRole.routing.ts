import * as Hapi from "hapi";
import * as Joi from "joi";
import UserRoleController from "./userRole.controller";
import { UserRoleModel } from "./userRole.model";
import * as UserRoleValidator from "./userRole.validator";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../@configurations";

export default function (server: Hapi.Server, serverConfigs: IServerConfigurations, database: IDatabase) {

    const userRoleController = new UserRoleController(serverConfigs, database);
    server.bind(userRoleController);

    server.route({
        method: 'GET',
        path: '/userRoles/role/{roleId}',
        config: {
            handler: userRoleController.listUserRolesByRole,
            auth: "jwt",
            tags: ['api', 'userRoles'],
            description: 'Get userRole info.',
        }
    });

    server.route({
        method: 'GET',
        path: '/userRoles/user/{userId}',
        config: {
            handler: userRoleController.listUserRolesByUser,
            auth: "jwt",
            tags: ['api', 'userRoles'],
            description: 'Get userRole info.',
        }
    });

    server.route({
        method: 'DELETE',
        path: '/userRoles',
        config: {
            handler: userRoleController.deleteUserRole,
            auth: "jwt",
            tags: ['api', 'userRoles'],
            description: 'Delete userRole.',
        }
    });

    server.route({
        method: 'PUT',
        path: '/userRoles',
        config: {
            handler: userRoleController.updateUserRole,
            auth: "jwt",
            tags: ['api', 'userRoles'],
            description: 'Update userRole info.',
        }
    });

    server.route({
        method: 'POST',
        path: '/userRoles',
        config: {
            handler: userRoleController.createUserRole,
            tags: ['api', 'userRoles'],
            description: 'Create a userRole.',
        }
    });
}