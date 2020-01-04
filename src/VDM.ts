import { Client } from './Client';

export interface VDMData {
    content: string;
    id: number;
}

export class VDM {
    public client: Client;
    public content: string;
    public id: number;
    public lang: string;

    constructor(client: Client, data: VDMData, lang: string) {
        this.client = client;
        this.content = data.content;
        this.id = data.id;
        this.lang = lang;
    }

    /**
     * Returns the vdm content instead of a VDM instance.
     * @returns {string} The formatted vdm.
     */
    public toString() {
        return this.content;
    }

    /**
     * Returns the vdm text using Discord spoilers instead of a VDM instance.
     * @returns {string}
     */
    public toDiscordSpoils() {
        return `||${this.content}||`;
    }
}
