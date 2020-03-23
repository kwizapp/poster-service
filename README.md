# poster-service

This service is responsible for returning urls of movie poster images for a specific `IMDb id`. It acts as a middleware and talks directly to https://www.omdbapi.com/. From there it fetches the poster-url and returns it.

## Development

### Login to NPM registry

As we are using a library provided by our organization [`kwiz-utils`](https://github.com/kwizapp/kwiz-utils). For npm to find the package, do the following:

- Login to Github Package Registry using `npm login --registry=https://npm.pkg.github.com` and your credentials. Any provided access token will need at least the `repo` and `read:packages` scope.

After that, `npm install` should run without any problems.

### Environment Variables

- create a `.env` file based on `.env.template`
- add an `API-KEY` for https://www.omdbapi.com/ (you can create one [here](https://www.omdbapi.com/apikey.aspx))
  - the `API-KEY` is already set on GitHub for the actions

### Local dev with `micro-dev`

```bash
npm run dev
```

This will start the micro HTTP service on PORT 3000.

## API

`/?id=<id>&size=<size>`

| Parameter | Type     | Description                                                       |
| :-------- | :------- | :---------------------------------------------------------------- |
| `id`      | `string` | **Required**. IMDb ID, unique to a film                           |
| `size`    | `number` | _Optional_. Size of the movie poster. Integer between [300, 1000] |

#### Examples

**By ID**

```bash
http://localhost:3000/?id=tt1477834
```

```json
{
  "poster": "https://m.media-amazon.com/images/M/MV5BOTk5ODg0OTU5M15BMl5BanBnXkFtZTgwMDQ3MDY3NjM@._V1_SX300.jpg"
}
```

**By ID with Size**

```bash
http://localhost:3000/?id=tt3896198&size=450
```

```json
{
  "poster": "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX450.jpg"
}
```

## Test

```bash
npm run test
```

For testing, we use [jest](https://jestjs.io/en/)
