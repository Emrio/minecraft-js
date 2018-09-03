# MCAPI : Accounts

> The accounts methods can be accessed by writing `MCAPI.accounts.method()`
>
> All methods return Promises

## Library

### `login(username_or_email: String, password: String)`

Logs a Mojang account in. This returns an instance of `MojangAccount`

This method makes <u>at least four</u> HTTP requests

### `LOAD_ALL_MC_ACCOUNTS: Boolean`

Set this to `true` if you want to get all of the info of the Minecraft profiles associated with an account

Default is `false`

## Classes

### `MojangAccount`

Represents a Mojang account

- `account_id: String`
The ID of the Mojang account (different from the player's uuid)

- `email: String`
The email associated with the account. This is hashed when `properties.hashed` is `true`

- `username: String`
The username of the account. This is hashed when `properties.hashed` is `true`

- `registration: Object`
This contains two key-value pairs with data related to the registration

 - `ip: String`
The IP with which the user registered his account

 - `date: Date`
The date when the user registered

- `last_password_change: Date`
The date when the user last changed its password

- `birthday: Date`
The birthday of the user

- `properties: MojangAccountProperties`
General properties of the account

- `profiles: MojangAccountProfiles`
An object representing the profiles of the games bought by the user

### `MojangAccountProperties`

A list of properties of an account

- `suspended: Boolean`
True when the account is suspended by Mojang

- `blocked: Boolean`
True when the account has been blocked

- `secured: Boolean`
**No information provided**

- `migrated: Boolean`
True when the account has been migrated from a minecraft.net account

- `email_verified: Boolean`
True when the email associated with the account has been verified

- `legacy: Boolean`
True when the user is a legacy user

- `parent_verified: Boolean`
True when the account has been approved by a parent

- `hashed: Boolean`
True when the account's email and username are hashed

- `from_migrated_user: Undocumented`
**No information provided**

### `MojangAccountProfiles`

Represents the profiles of the Mojang games bought by the user

- `list: Array`
The list of profiles of the account. The elements of this array are all instances of `MinecraftProfile` or `OtherProfile`

- `selected: MinecraftProfile or OtherProfile`
The profile selected by the user. This object is already an element of `list`

### `MinecraftProfile` *extends* `GameProfile`

Represents a Minecraft Profile

- `legacy: Boolean`
True when the profile is a legacy profile

- `suspended: Boolean`
True when the profile has been suspended

- `premium: Boolean`
True when the profile is a paid account

- `migrated: Boolean`
True when the account has been migrated from a minecraft.net account

- `player: LoggedPlayer`
The player associated with the profile. Is `undefined` when the player has not been loaded

- `loadPlayer()`
Loads the player object associated with the profile

### `OtherProfile` *extends* `GameProfile`

This object represents the profile of a game other than Minecraft

- `data: Object`
Raw data from the HTTP request. This data is not formatted because 1) this is a Minecraft library and 2) there is no known information about this data.

### `GameProfile`

Most basic information on a Mojang account's game profile

- `game: String`
The game of the profile

- `uuid: String`
The UUID of the profile

- `username: String`
The username of the profile

- `created: Date`
The date when the profile was created

- `token: String`
**No information provided**

- `account: MojangAccount`
The account associated with the profile **(Recursive)**

### `LoggedPlayer` *extends* `RegularPlayer`

Represents the information of a player. This object offers skin manipulation unlike `RegularPlayer`

The `RegularPlayer` class is documented at `docs/Players/Classes/RegularPlayer`

- `associated_account: MojangAccount`
The account associated with the player **(Recursive)**

- `textures: LoggedPlayerTextures`
The skin and cape of the player. Offers skin manipulation

### `LoggedPlayerTextures` *extends* `RegularPlayerTextures`

Represents the skin and cape of a player from a logged in account.
Allows skin manipulation

- `associated_account: MojangAccount`
The account associated with the player that have these textures **(Recursive)**

- `player: LoggedPlayer`
The player that have these textures **(Recursive)**

- `reset_skin()`
Resets the skin to the original one. Depends on `slim`

- `use_url_skin(url: String[, slim: Boolean])`
Changes the skin from an online image. Can also use slim skins

- `upload_skin(?)`
**Work in progress**
