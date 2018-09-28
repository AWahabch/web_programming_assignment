import * as Server from "./server";
import * as Database from "./database";
import * as Configs from "./@configurations";
import * as fs from 'fs';

console.log(`Running environment ${process.env.NODE_ENV || "dev"}`);

// Catch unhanding unexpected exceptions
process.on('uncaughtException', (error: Error) => {
    console.error(`uncaughtException ${error.message}`);
});

// Catch unhanding rejected promises
process.on('unhandledRejection', (reason: any) => {
    console.error(`unhandledRejection ${reason}`);
});

// Init Database
const dbConfigs = Configs.getDatabaseConfig();
const database = Database.init(dbConfigs);
const uploadConfig = Configs.getUploadConfig();
// Starting Application Server
const serverConfigs = Configs.getServerConfigs();

Server.init(serverConfigs, database).then((server) => {
    server.start(() => {
        if (!fs.existsSync(uploadConfig.folder)) {
            fs.mkdirSync(uploadConfig.folder);
        }
        // console.log('Server running at:', server.info.uri);
    });
});