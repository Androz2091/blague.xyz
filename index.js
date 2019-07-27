const fetch = require("node-fetch"),
version = require("./package.json").version;

class Joke {

	constructor(joke){
		this.question = joke.jokequestion;
		this.answer = joke.jokereponse;
    }
    
    /**
     * Returns the joke text instead of the Joke object.
     * @returns String
     */
	toString(){
		return `${this.question}\n${this.answer}`;
    }

};

class Joker {
	
	constructor(options = {}){
		this.token = options.token;
		this.baseURL = options.baseURL || "https://blague.xyz/joke";
	}
	
	/**
	 * Make a call to the API
	 * @param {string} path The path of the endpoint to call
	 * @returns {Promise<Object>}
	*/
	async _get(path){
        let options = (this.token ? { headers: { "Authorization": this.token } } : null);
        let res = await fetch(`${this.baseURL}/${path}`, options);
        let data = await res.json();
		return data;
	}
	
	/**
	 * Get a random joke 
	 * @returns {Promise<Joke>}
	*/
	async random(){
		let data = await this._get("random");
		return new Joke(data);
	}
	
	/**
	 * Get the joke of the day
	 * @returns {Promise<Joke>}
	*/
	async daily(){
		let data = await this._get("day");
		return new Joke(data);
	}
	
	/**
	 * Get a joke with its ID
	 * @param {number} id ID of the joke
	 * @returns {Promise<Joke>}
	*/
	async get(id){
		let data = await this._get(id);
		return new Joke(data);
    }
	
	/**
	 * Get the package version
	 * @returns {string}
	*/
	get version(){
		return version;
	}
}

module.exports = Joker;