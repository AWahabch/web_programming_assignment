import * as Hapi from "hapi";
import * as Joi from "joi";
import RoleController from "./role.controller";
import { RoleModel } from "./role.model";
import * as RoleValidator from "./role.validator";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../@configurations";

export default function (server: Hapi.Server, serverConfigs: IServerConfigurations, database: IDatabase) {

    const roleController = new RoleController(serverConfigs, database);
    server.bind(roleController);

    server.route({
        method: 'GET',
        path: '/roles/info/{id}',
        config: {
            handler: roleController.infoRole,
            auth: "jwt",
            tags: ['api', 'roles'],
            description: 'Get role info.',
        }
    });

    server.route({
        method: 'GET',
        path: '/roles',
        config: {
            handler: roleController.listRole,
            auth: "jwt",
            tags: ['api', 'roles'],
            description: 'Get role info.',
        }
    });

    server.route({
        method: 'DELETE',
        path: '/roles/{id}',
        config: {
            handler: roleController.deleteRole,
            auth: "jwt",
            tags: ['api', 'roles'],
            description: 'Delete role.',
        }
    });

    server.route({
        method: 'PUT',
        path: '/roles',
        config: {
            handler: roleController.updateRole,
            auth: "jwt",
            tags: ['api', 'roles'],
            description: 'Update role info.',
        }
    });

    server.route({
        method: 'POST',
        path: '/roles',
        config: {
            handler: roleController.createRole,
            tags: ['api', 'roles'],
            description: 'Create a role.',
        }
    });
}