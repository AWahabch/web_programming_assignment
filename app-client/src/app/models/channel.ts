import { Group } from './group';
export class Channel {
    constructor(
        public id: string,
        public name: string, 
        public group: Group) {
    }
}