# Blague.xyz

Blague.xyz est un module vous permettant d'obtenir facilement des blagues depuis [Blague.xyz](https://blague.xyz) API.

🇫🇷 Pour le moment, seules des blagues en français sont disponibles !

## Installation

```
$ npm install --save blague.xyz
```

## Exemple d'utilisation

```js
const Client = require("blague.xyz");
const joker = new Client("Optional API token", {
    defaultLang: "fr" 
});

// Gets a random joke
joker.randomJoke().then((joke) => {
    console.log(joke.question); // Que dit une feuille quand elle tombe dans l'eau ?
    console.log(joke.answer); // J'ai papier
    console.log(joke.toString()); // Que dit une feuille quand elle tombe dans l'eau ?\nJ'ai papier
    console.log(joke.toDiscordSpoils()); // Que dit une feuille quand elle tombe dans l'eau ?\n\n||J'ai papier||
    console.log(joke.id); // 71
});

// Gets an english joke
joker.dailyJoke("en").then((joke) => {
    console.log(joke.question); // What is the only dog you can eat ?
    console.log(joke.answer); // A Hot Dog
});

// Gets a joke with its ID
joker.get(10, "fr").then((joke) => {
    console.log(joke.question); // Que dit une fleur qui a eu zéro à un contrôle ?
    console.log(joke.answer); // Qu'elle s'est plantée
});
```

## Liens

* [Site](https://blague.xyz)
* [Documentation](https://docs.blague.xyz)
* [Discord](https://discord.gg/CJgNcJN)
* [Github (source)](https://github.com/Androz2091/blague.xyz)
* [NPM](https://npmjs/package/blague.xyz)
