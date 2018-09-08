# MCAPI : Servers

> The servers methods can be accessed by writing `MCAPI.servers.method()`
>
> All methods return Promises

## Library

### `get(host: String[, port: Number])`

Gets information about a server. Returns a promise of an instance of `Server`

The port can be specified in the `host` parameter by separating it from the IP with `:` (eg: `play.myserver.net:12345`)

If no port is provided, `DEFAULT_PORT` will be used

This method makes <u>two</u> requests

### `blocked_servers()`

Promises an array of SHA1 encoded IPs. This IPs are blocked by Mojang most of the time for not following its EULA

This method makes <u>one</u> HTTP requests

### `DEFAULT_PORT: Number` *read only*

The default Minecraft servers port


## Classes

### `Server`

Represents a Minecraft server

- `host: String`
The IP of the server

- `port: Number`
The port of the server

- `motd: Object`
The *message of the day* of the server (aka description)

 - `raw: String`
 The raw string of the motd

 - `formatted: String`
 A formatted version with removed start and end spaces

- `players: ServerPlayers`
Players related information of the server (connected, max, sample)

- `version: String`
The Minecraft version given by the server (some servers may change this to something else like a range of versions)

- `protocol: Number`
The Minecraft protocol used by the server

- `version_from_protocol: String`
The Minecraft version deducted from the protocol version

- `favicon: String`
The base64-encoded favicon of the server

### `ServerPlayers`

Represents players-related information of a server

- `online: Number`
The number of players currently online

- `max: Number`
The maximum number of players of this server

- `sample: Array of Players`
An array containing a sample of players given by the server. This array may be empty if the server doesn't give this information

The `Player` class is documented at `docs/Players/Classes/Player`
