import axios from 'axios';
import { Joke, JokeData } from './Joke';
import { VDM, VDMData } from './VDM';

interface ClientOptions {
    baseURL: string;
    defaultLang: string;
}

interface APIResponse {
    data: any;
    lang: string;
}

export class Client {
    public token: string;
    public defaultLang: string;
    public baseURL: string;

    constructor(token: string, options: ClientOptions) {
        if (!token) {
            throw new SyntaxError('Invalid Token: Token must be a String');
        }
        this.token = token;
        this.baseURL = options.baseURL || 'https://blague.xyz/api';
        this.defaultLang = options.defaultLang || 'fr';
    }

    /**
     * Get a random joke
     * @param {string} [lang] The joke language
     * @returns {Promise<Joke>}
     */
    public async randomJoke(lang?: string) {
        const res = await this._get('joke/random', lang);
        return new Joke(this, res.data.joke, res.lang);
    }

    /**
     * Get the joke of the day
     * @param {string} [lang] The joke language
     * @returns {Promise<Joke>}
     */
    public async dailyJoke(lang?: string) {
        const res = await this._get('joke/day', lang);
        return new Joke(this, res.data.joke, res.lang);
    }

    /**
     * Get a joke with its ID
     * @param {number} id ID of the joke
     * @param {string} [lang] The joke language
     * @returns {Promise<Joke>}
     */
    public async getJoke(id: string, lang?: string) {
        const res = await this._get(`joke/${id}`, lang);
        return new Joke(this, res.data.joke, lang);
    }

    /**
     * Get the joke list
     * @param {string} [lang] The joke language
     * @returns {Promise<Joke>}
     */
    public async listJoke(lang?: string) {
        const res = await this._get('joke/list', lang);
        return res.data.joke;
    }

    /**
     * Get a random vdm
     * @param {string} [type] The vdm type
     * @param {string} [lang] The vdm language
     * @returns {Promise<Joke>}
     */
    public async randomVDM(type: string = 'normal', lang?: string) {
        const res = await this._get(`vdm/random`, lang, type);
        return new VDM(this, res.data.vdm, res.lang);
    }

    /**
     * Get the vdm of the day
     * @param {string} [type='normal'] The vdm type
     * @param {string} [lang] The vdm language
     * @returns {Promise<VDM>}
     */
    public async dailyVDM(type: string = 'normal', lang?: string) {
        const res = await this._get('vdm/day', lang, type);
        return new VDM(this, res.data.vdm, res.lang);
    }

    /**
     * Get a vdm with its ID
     * @param {number} id ID of the vdm
     * @param {string} [type='normal'] The vdm type
     * @param {string} [lang] The vdm language
     * @returns {Promise<VDM>}
     */
    public async getVDM(id: string, type: string = 'normal', lang?: string) {
        const res = await this._get(`vdm/${id}`, lang, type);
        return new VDM(this, res.data.vdm, lang);
    }

    /**
     * Get the vdm list
     * @param {string} [type='normal'] The vdm type
     * @param {string} [lang] The vdm language
     * @returns {Promise<VDM>}
     */
    public async listVDM(type: string = 'normal', lang?: string) {
        const res = await this._get(`vdm/list`, lang, type);
        return res.data.vdm;
    }

    /**
     * Make a call to the API
     * @param {string} path The path of the endpoint to call
     * @param {string} [lang] The lang to add to the request
     * @returns {Promise<APIResponse>}
     */
    private _get(path: string, lang?: string, type?: string) {
        return new Promise<APIResponse>(async (resolve, reject) => {
            lang = lang ? lang.toLowerCase() : this.defaultLang;
            let url = `${this.baseURL}/${path}?lang=${lang}`;
            if (type) {
                url += `&type=${type}`;
            }
            axios
                .get(url, {
                    method: 'get',
                    headers: { Authorization: this.token }
                })
                .then(res => {
                    const data = res.data;
                    if (data.status === 200) {
                        resolve({ data, lang });
                    } else if (data.status === 401 && data.message === 'Invalid token') {
                        reject('Invalid blague.xyz token.');
                    } else if (data.status === 401 && data.message === 'Premium endpoint') {
                        reject('You cannot use premium endpoints.');
                    } else {
                        reject(data.message);
                    }
                });
        });
    }
}

export default Client;
