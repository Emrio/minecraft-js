# MCAPI : Miscellaneous

> The miscellaneous methods can be accessed by writing `MCAPI.misc.method()`
>
> All methods return Promises

## Library

### `fetch_status()`

Promises an instance of `ServiceStatus`, fetches the status of the Mojang services

This method makes <u>one</u> HTTP requests

### `stats: Class - Sub API`

Includes methods for statistics about Minecraft sales

#### `sold()`

Promises an instance of `SalesOverview` which represents statistics about the sales of the Minecraft game

This method makes <u>one</u> HTTP requests

#### `prepaid_cards()`

Same as `sold()` but for prepaid cards sales

This method makes <u>one</u> HTTP requests

#### `all()`

Joins `sold()` and `prepaid_cards()`. Promises an object with 2 key-value pairs. The first key is `sold_items` which represents the `sold()` method and `prepaid_cards` which represents the `prepaid_cards()` method

This method makes <u>two</u> HTTP requests

## Classes

### `SalesOverview`

Represents statistics on a type of sales

- `type: String`
The type of sales. Can be either `prepaid_cards` or `sold_items`

- `total: Number`
The total number of things being sold

- `last24h: Number`
The number of sold items for the last 24 hours

- `velocity: Number`
The current number of sales per second

### `MCAPIError` *extends* `Error`

This error can sometimes be thrown instead of a regular error.

- `code`
An HTTP error code

- `date`
The date when the error has been thrown
