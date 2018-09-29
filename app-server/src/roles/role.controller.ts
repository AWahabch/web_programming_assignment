import * as Hapi from "hapi";
import * as Boom from "boom";
import { IRole } from "./role.model";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../@configurations";

export default class RoleController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.database = database;
        this.configs = configs;
    }

    public async createRole(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model = request.payload;
        try {
            let role: any = await this.database.roleModel.create(model);
            return reply(role);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async updateRole(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model: IRole = request.payload;

        try {
            console.log(model);
            let role: IRole = await this.database.roleModel.findByIdAndUpdate(model._id, model);
            role = await this.database.roleModel.findById(model._id);
            return reply(role);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async deleteRole(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const id = request.params['id'];
            let role: IRole = await this.database.roleModel.findByIdAndRemove(id);
            return reply();
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async infoRole(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const id = request.params['id'];
            console.log(id);
            let role: IRole = await this.database.roleModel.findById(id);

            reply(role);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async listRole(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const roles = await this.database.roleModel.find({});
            reply(roles);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

}