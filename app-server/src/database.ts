import * as Mongoose from "mongoose";
import { IDataConfiguration } from "./@configurations";

// Entities
import { IUser, UserModel } from "./users/user.model";
import { IGroup, GroupModel } from "./groups/group.model";
import { IChannel, ChannelModel } from "./channels/channel.model";
import { IRole, RoleModel } from "./roles/role.model";
import { IUserRole, UserRoleModel } from "./userRoles/userRole.model";
import { IUserChannel, UserChannelModel } from "./userChannels/userChannel.model";
import { IMessage, MessageModel } from "./messages/message.model";
import { IUserActivity, UserActivityModel } from "./userActivities/userActivity.model";
export interface IDatabase {
    userModel: Mongoose.Model<IUser>;
    groupModel: Mongoose.Model<IGroup>;
    channelModel: Mongoose.Model<IChannel>;
    roleModel: Mongoose.Model<IRole>;
    userRoleModel: Mongoose.Model<IUserRole>;
    userChannelModel: Mongoose.Model<IUserChannel>;
    messageModel: Mongoose.Model<IMessage>;
    userActivityModel: Mongoose.Model<IUserActivity>;
}

export function init(config: IDataConfiguration): IDatabase {

    (<any>Mongoose).Promise = Promise;
    Mongoose.connect(process.env.MONGO_URL || config.connectionString);

    let mongoDb = Mongoose.connection;

    mongoDb.on('error', () => {
        console.log(`Unable to connect to database: ${config.connectionString}`);
    });

    mongoDb.once('open', () => {
        console.log(`Connected to database: ${config.connectionString}`);
    });

    return {
        userModel: UserModel,
        groupModel: GroupModel,
        channelModel: ChannelModel,
        roleModel: RoleModel,
        userRoleModel: UserRoleModel,
        userChannelModel: UserChannelModel,
        messageModel: MessageModel,
        userActivityModel: UserActivityModel
    };
}