express-one-hostname is a very small express middleware that ensures your cloud-hosted website only responds to one hostname.

It ensures that cloud hostnames like `your-app-1234.some-cloud-provider.com` are not indexed by search engines.

It requires you set an `ALLOWED_HOSTNAME` environment variable.

## Installation

```
$ npm install express-one-hostname
```

## Usage

```js
// This will throw an error if ALLOWED_HOSTNAME is not set
const oneHostname = require('express-one-hostname')
app.use(oneHostname)
```

```js
// This uses one-hostname only if ALLOWED_HOSTNAME is set
if (process.env.ALLOWED_HOSTNAME) {
  const oneHostname = require('express-one-hostname')
  app.use(oneHostname)
}
```

## Running tests

Install dependencies:

```shell
$ npm install
```

Run tests:

```shell
$ npm test
```

## License

MIT
