import * as Hapi from "hapi";
import * as Boom from "boom";
import * as Jwt from "jsonwebtoken";
import { IUser } from "./user.model";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../@configurations";
import { uploader } from "../@common/image";

export default class UserController {

    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.database = database;
        this.configs = configs;
    }

    private generateToken(user: IUser) {
        const jwtSecret = this.configs.jwtSecret;
        const jwtExpiration = this.configs.jwtExpiration;

        return Jwt.sign(<any>({ id: user._id }), jwtSecret, { expiresIn: jwtExpiration });
    }


    public async loginUser(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const username = request.payload.username;
            const password = request.payload.password;

            let user: IUser = await this.database.userModel.findOne({ username: username });

            if (!user) {
                return reply({ error: true, message: 'User doesn\'t exist' });
            }

            if (!user.validatePassword(password)) {
                return reply({ error: true, message: 'Invalid username and password.' });
            }

            const roles = await this.database.userRoleModel.find({ "userId": user._id });
            let userRoles = [];
            const _this = this;
            for (var i = 0; i < roles.length; i++) {
                const role = await _this.database.roleModel.findById(roles[i].roleId);
                userRoles.push(role);
            }

            reply({
                token: this.generateToken(user),
                user_mail: user.email,
                id: user.id,
                username: user.username,
                roles: userRoles,
                imageUrl: user.imageUrl,
            });
        } catch (error) {
            return reply({ error: true, message: 'Invalid username and password' });
        }
    }

    public async createUser(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model = request.payload;
        try {
            let user: any = await this.database.userModel.create(model);
            user.isVerify = true;
            return reply({ token: this.generateToken(user) }).code(201);

        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async updateUserImage(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model = request.payload;
        try {
            const id = request.auth.credentials.id;
            const data = request.payload;
            const file = data['avatar']; // accept a field call avatar

            // save the file
            const fileDetails = await uploader(file);
            console.log(fileDetails['filename']);
            let user: IUser = await this.database.userModel.findByIdAndUpdate(id, {
                $set: {
                    "imageUrl": fileDetails['filename']
                }
            }, { new: true });
            return reply({
                imageUrl: user["imageUrl"]
            });

        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async updateUser(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const id = request.auth.credentials.id;

        try {
            let user: IUser = await this.database.userModel.findByIdAndUpdate(id, { $set: request.payload }, { new: true });
            return reply(user);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

    public async deleteUser(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const id = request.auth.credentials.id;
        let user: IUser = await this.database.userModel.findByIdAndRemove(id);

        return reply(user);
    }

    public async infoUser(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const id = request.auth.credentials.id;
        let user: IUser = await this.database.userModel.findById(id);

        reply(user);
    }

    public async getUserById(id) {
        let user: IUser = await this.database.userModel.findById(id);
        return user;
    }

    public async listUsers(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            const users = await this.database.userModel.find({});
            reply(users);
        } catch (error) {
            return reply(Boom.badImplementation(error));
        }
    }

}