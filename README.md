# minecraft-js [![npm version][img-version]][link-npm-package] [![license][img-license]][link-license]

> A pure-JS, promise-based, easy to use library for Minecraft and Mojang API in JavaScript

[License][link-license] |
[Documentation][link-docs] |
[Github][link-repo] |
[Author][link-author] |
[Site][link-site]


Some things you can do with this library :
- Get player's info
- Ping a server
- Get Minecraft services status
- Manipulate your skin

## Installation

In your npm project, simply type :

```shell
$ npm install minecraft-js --save
```

## Basic usage

```js
const MCAPI = require("minecraft-js")

MCAPI.players.get("Notch")
  .then(player => {
    console.log("Username : " + player.username)
    console.log("UUID : " + player.uuid)
    console.log("Skin URL : " + player.textures.skin_url)
  })
  .catch(console.error)
```

## Docs and examples

The library's methods and attributes are all referenced in the [online documentation][link-docs]

Some examples are available [here][link-examples]

## Dependencies

Minecraft-js loves and uses :
- [`minecraft-data`][link-minecraft-data]: A module from PrismarineJS which provides data about Minecraft in JavaScript
- [`request`][link-request]: Best module ever for HTTP requests!
- [`js-base64`][link-base64]: A base64 transcoder for JavaScript

## Related packages
- [`mc-ping-updated`][link-mc-ping] : Module for pinging servers
- [`mojang-api`][link-mojang-api]: A small wrapper around some Mojang API's features
- [`mojang`][link-node-mojang]: A library covering the Mojang API

## Contributing

Feel free to contribute to the project!

Some attributes are not documented, especially some from `MojangAccountProperties` because no information have been found. Contributing to the docs would be greatly appreciated!

## To do

The following features are not implemented yet:

- `LoggedPlayerTextures.upload_skin()`
- Mojang token manipulation

## License

This project is licensed under the [MIT License][link-license].

Minecraft-js is not affiliated by anyway with Mojang AB. This library is in fact unofficial.






<!-- The links! -->
[link-docs]: https://github.com/TheEmrio/minecraft-js/blob/master/docs
[link-examples]: https://github.com/TheEmrio/minecraft-js/tree/master/examples
[link-license]: https://github.com/TheEmrio/minecraft-js/blob/master/LICENSE
[link-repo]: https://github.com/TheEmrio/minecraft-js
[link-author]: https://github.com/TheEmrio
[link-site]: https://emrio.fr
[link-npm-package]: https://www.npmjs.com/package/minecraft-js

[link-minecraft-data]: https://github.com/PrismarineJS/node-minecraft-data
[link-request]: https://github.com/request/request
[link-base64]: https://github.com/dankogai/js-base64
[link-mc-ping]: https://github.com/Cryptkeeper/mc-ping-updated
[link-mojang-api]: https://github.com/minecrafter/mojang-api
[link-node-mojang]: https://github.com/maccelerated/node-mojang

[img-version]: https://img.shields.io/npm/v/minecraft-js.svg
[img-license]: https://img.shields.io/npm/l/minecraft-js.svg
