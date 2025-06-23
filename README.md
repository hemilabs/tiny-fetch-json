# tiny-fetch-json

Tiny wrapper around Fetch to query JSON APIs more easily.

## Requirements

- Node.js 18+ (or any environment with `fetch` available)

## Install

```sh
npm install tiny-fetch-json
```

## Usage

```js
const fetchJson = require("tiny-fetch-json");

const res = await fetchJson("https://any.json.api", {
  headers: { Authorization: "Bearer TOKEN" },
});
// `res` will be an object resulting from parsing the JSON response
```

## API

### `fetchJson(resource, options)`

Fetches JSON data from a URL.

- Throws an error if the request fails or the response is not 2xx.
- Returns a `Promise` with the response parsed as JSON.

#### `resource`

Type: `string | URL | Request`  
The resource to fetch, i.e. the URL.

#### `options`

Type: `RequestInit`  
Additional settings to apply to the request.
