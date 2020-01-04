import { Client } from './Client';

export interface JokeData {
    question: string;
    answer: string;
    id: number;
}

export class Joke {
    public client: Client;
    public question: string;
    public answer: string;
    public id: number;
    public lang: string;

    constructor(client: Client, data: JokeData, lang: string) {
        this.client = client;
        this.question = data.question;
        this.answer = data.answer;
        this.id = data.id;
        this.lang = lang;
    }

    /**
     * Returns the joke text instead of a Joke instance.
     * @returns {string} The formatted joke.
     */
    public toString() {
        return `${this.question}\n${this.answer}`;
    }

    /**
     * Returns the joke text using Discord spoilers instead of a Joke instance.
     * @returns {string}
     */
    public toDiscordSpoils() {
        return `${this.question}\n\n||${this.answer}||`;
    }
}
