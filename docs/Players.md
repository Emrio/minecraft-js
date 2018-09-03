# MCAPI : Players

> The players methods can be accessed by writing `MCAPI.players.method()`
>
> All methods return Promises

## Library

### `get(username: String)`

Gets information about a player from its nickname. Returns a promise of an instance of `RegularPlayer`

This method makes <u>three</u> HTTP requests

### `get_from_uuid(uuid: String)`

Gets information about a player from its uuid. Returns a promise of an instance of `RegularPlayer`

This method makes <u>two</u> HTTP requests

## Classes

### `RegularPlayer` *extends* `Player`

Represents a player requested from `get()` and `get_from_uuid()`

- `legacy: Boolean`
True if the player is a legacy player

- `demo: Boolean`
True if the player is a demo player (not premium)

- `username_history: UsernameHistory`
An object representing the history of usernames of the player

- `textures: RegularPlayerTextures`
An object representing the skin and cape of the player


### `Player`

Most basic information of a user

- `uuid: String`
The UUID of the player

- `username: String`
The current nickname of the player

### `UsernameHistory`

Represents the history of usernames of the player

- `all: Object`
A key-value object with key being a username and value being the timestamp when the username has been changed

- `first: String`
The first username of the player

- `last: String`
The last username the player set (current)

- `had(username: String)`
Returns `true` if the player already used this nickname

- `at(timestamp: Number)`
Returns the username the player had at this timestamp

### `RegularPlayerTextures`

An object representing the skin and cape of a player requested by `get()` and `get_from_uuid()`

- `player: RegularPlayer`
The player to who the textures belongs **(Recursive)**

- `timestamp: Number`
The timestamp when the skin was updated

- `skin_url: String`
The url where the skin has been uploaded by Mojang (null if no skin is applied)

- `cape_url: String`
The url where the skin has been uploaded by Mojang (null if no cape is applied)

- `slim: Boolean`
True if the skin has the "slim" model applied (thinner arms)
