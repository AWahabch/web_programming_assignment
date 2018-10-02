import { Channel } from './channel';
import { Role } from './role';
export class User {
    constructor(
        public id: string,
        public username?: string,
        public email?: string, 
        public password?: string,
        public channels: Channel[] = [],
        public roles: Role[] = []
    ) {}
}