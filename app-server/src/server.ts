import * as Hapi from "hapi";
import * as Boom from "boom";

// Cores
import { IPlugin } from "./@plugins/interfaces";
import { IServerConfigurations } from "./@configurations";
import { IDatabase } from "./database";

// Controllers
import * as Users from "./users";
import * as Groups from './groups';
import * as Channels from './channels';
import * as Roles from './roles';
import * as UserRoles from './userRoles';
import * as UserChannels from './userChannels';
import * as UserActivities from './userActivities';
import * as Messages from './messages';
import * as Chat from './chat';
export function init(configs: IServerConfigurations, database: IDatabase): Promise<Hapi.Server> {

    return new Promise<Hapi.Server>(resolve => {

        const port = process.env.PORT || configs.port;
        const server = new Hapi.Server();

        server.connection({
            port: port,
            routes: {
                cors: true
            }
        });

        server.connection({ port: 4001, labels: ['chat'] }); //seperated port for chatting
        if (configs.routePrefix) {
            server.realm.modifiers.route.prefix = configs.routePrefix;
        }

        //  Setup Hapi Plugins
        const plugins: Array<string> = configs.plugins;
        const pluginOptions = {
            database: database,
            serverConfigs: configs
        };

        let pluginPromises = [];

        plugins.forEach((pluginName: string) => {
            var plugin: IPlugin = (require("./@plugins/" + pluginName)).default();
            console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
            pluginPromises.push(plugin.register(server, pluginOptions));
        });

        Promise.all(pluginPromises).then(() => {
            console.log('All plugins registered successfully.');

            console.log('Register Routes');

            Users.init(server, configs, database);
            Groups.init(server, configs, database);
            Channels.init(server, configs, database);
            Roles.init(server, configs, database);
            UserRoles.init(server, configs, database);
            UserActivities.init(server, configs, database);
            UserChannels.init(server, configs, database);
            Messages.init(server, configs, database);
            Chat.init(server, configs, database);
            console.log('Routes registered successfully.');

            resolve(server);
        });
    });
}