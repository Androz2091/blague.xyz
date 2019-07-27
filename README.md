# Joker

Joker est un module vous permettant d'obtenir facilement des blagues depuis [Blague.xyz](https://blague.xyz) API.

🇫🇷 Pour le moment, seules des blagues en français sont disponibles !

## Installation

```
$ npm install --save joker
```

## Exemple d'utilisation

```js
const Joker = require("./joker.js/index");
const joker = new Joker({
    token: "Optional API token"
});

// Obtenir une blague aléatoire
joker.random().then((joke) => {
    console.log(joke.question); // Que dit une feuille quand elle tombe dans l'eau ?
    console.log(joke.answer); // J'ai papier
    console.log(joke.toString()); // Que dit une feuille quand elle tombe dans l'eau ?\nJ'ai papier
});

// Obtenir la blague du jour
joker.daily().then((joke) => {
    console.log(joke.question); // Comment appelle-t-on un chat tombé dans un pot de peinture le jour de Noël ?
    console.log(joke.answer); // Un chat peint de Noël
});

// Obtenir une blague avec son ID
joker.get(10).then((joke) => {
    console.log(joke.question); // Que dit une fleur qui a eu zéro à un contrôle ?
    console.log(joke.answer); // Qu'elle s'est plantée
});

console.log(joker.version); // 1.0.0
```

## Liens

* [Site](https://blague.xyz)
* [Documentation](https://docs.blague.xyz)
* [Discord](https://discord.gg/CJgNcJN)
* [Github (source)](https://github.com/Androz2091/joker.js)
* [NPM](https://npmjs/package/joker)