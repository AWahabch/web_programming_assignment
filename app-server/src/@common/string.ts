const randomstring = require("randomstring");
const moment = require('moment');

export class StringUtils {
    public static codeGen(prefix: string) {
        const date = new Date();
        const datePrefix = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`;
        return `${prefix}${datePrefix}${(randomstring.generate(5)).toUpperCase()}`;
    }
}