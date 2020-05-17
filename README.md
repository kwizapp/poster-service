# poster-service

This service is responsible for returning urls of movie poster images for a specific `IMDb id`. It acts as a middleware and talks directly to https://www.omdbapi.com/. From there it fetches the poster-url and returns it.

## Development

This service depends on the following:
* GitHub Access Token that can read packages (`read:packages`)
* API key for www.omdbapi.com (`.env` file created from `.env.template`)

### GitHub Access Token NPM registry

As we are using a library provided by our organization [`kwiz-utils`](https://github.com/kwizapp/kwiz-utils). For npm to find the package, do the following:

- Login to Github Package Registry using `npm login --registry=https://npm.pkg.github.com` and your credentials. Any provided access token will need at least the `repo` and `read:packages` scope.

After that, `npm install` should run without any problems.

### Add API Key to `.env` file

- create a `.env` file based on `.env.template`
- add an `API-KEY` for https://www.omdbapi.com/ (you can create one [here](https://www.omdbapi.com/apikey.aspx))
  - the `API-KEY` is already set on GitHub for the actions

### Local Development with `micro-dev`

```bash
npm run dev
```

This will start the micro HTTP service on PORT 3002.

## API

Please consult the [wiki](https://github.com/kwizapp/kwiz/wiki/API-Reference#poster-service) for the API documentation and examples.


## Test

To execute all tests, run the following command:

```bash
npm run test
```
