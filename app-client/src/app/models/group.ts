import { Channel } from './channel';
export class Group {
    constructor(
        public id: string,
        public name: string,
        public channels: Channel[] = []
    ) {}
}