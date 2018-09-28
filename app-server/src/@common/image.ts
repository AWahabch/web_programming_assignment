import * as del from 'del';
import * as Loki from 'lokijs';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as Configs from "../@configurations";

const uploadConfig = Configs.getUploadConfig();
const fileOptions = { dest: `${uploadConfig.folder}/` };

const imageFilter = function (fileName: string) {
    // accept image only
    if (!fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
        return false;
    }
    return true;
};


const uploader = function (file: any) {
    if (!file) {
        throw new Error('no file(s)');
    }
    return _fileHandler(file, fileOptions);
};

const _fileHandler = function (file: any, options: FileUploaderOption) {
    if (!file) {
        throw new Error('no file');
    }

    const orignalname = file.hapi.filename;
    let filename = uuid.v1();
    let path = `${options.dest}${filename}`;
    if (file.hapi.filename.indexOf('.') > 0) {
        path = path + file.hapi.filename.substr(file.hapi.filename.length - 4);
        filename += file.hapi.filename.substr(file.hapi.filename.length - 4);
    }
    const fileStream = fs.createWriteStream(path);
    return new Promise((resolve, reject) => {
        file.on('error', function (err) {
            reject(err);
        });

        file.pipe(fileStream);

        file.on('end', function (err) {
            const fileDetails: FileDetails = {
                fieldname: file.hapi.name + file.hapi.headers['content-type'],
                originalname: file.hapi.filename,
                filename,
                mimetype: file.hapi.headers['content-type'],
                destination: `${options.dest}`,
                path,
                size: fs.statSync(path).size,
            };

            resolve(fileDetails);
        });
    });
};

interface FileUploaderOption {
    dest: string;
    fileFilter?(fileName: string): boolean;
}

interface FileDetails {
    fieldname: string;
    originalname: string;
    filename: string;
    mimetype: string;
    destination: string;
    path: string;
    size: number;
}

export { uploader };
