import * as Hapi from "hapi";
import * as Boom from "boom";
import { IUserRole } from "./userRole.model";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../@configurations";

export default class UserRoleController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.database = database;
        this.configs = configs;
    }

    public async createUserRole(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model = request.payload;
        try {
            let userRole: any = await this.database.userRoleModel.create(model);
            return reply(userRole);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async updateUserRole(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model: IUserRole = request.payload;

        try {
            let userRole: IUserRole = await this.database.userRoleModel.findByIdAndUpdate(model._id, model);
            userRole = await this.database.userRoleModel.findById(model._id);
            return reply(userRole);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async deleteUserRole(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const id = request.payload['_id'];
            let userRole: IUserRole = await this.database.userRoleModel.findByIdAndRemove(id);
            return reply();
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async listUserRolesByUser(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const userId = request.params['userId'];
            const userRoles = await this.database.userRoleModel.find({"userId": userId});
            reply(userRoles);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async listUserRolesByRole(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const roleId = request.params['roleId'];
            const userRoles = await this.database.userRoleModel.find({"roleId": roleId});
            reply(userRoles);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

}