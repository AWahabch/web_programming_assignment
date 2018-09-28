import * as nconf from "nconf";
import * as path from "path";

//Read Configurations
const configs = new nconf.Provider({
    env: true,
    argv: true,
    store: {
        type: 'file',
        file: path.join(__dirname, `./config.${process.env.NODE_ENV || "dev"}.json`)
    }
});

export interface IServerConfigurations {
    port: number;
    plugins: Array<string>;
    jwtSecret: string;
    jwtExpiration: string;
    routePrefix: string;
    url: string;
}

export interface IDataConfiguration {
    connectionString: string;
}

export interface IMail {
    email: string;
    password: string;
    title: string;
    clientUrl: string;
    path: string;
}

export interface IUploadConfig {
    folder: string;
}

export function getDatabaseConfig(): IDataConfiguration {
    return configs.get("database");
}

export function getServerConfigs(): IServerConfigurations {
    return configs.get("server");
}

export function getMailConfigs(): IMail {
    return configs.get("mail");
}

export function getUploadConfig(): IUploadConfig {
    return configs.get("upload");
}