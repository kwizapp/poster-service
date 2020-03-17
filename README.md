# poster-service

This service is responsible for returning urls of movie poster images for a specific `IMDb id`. It acts as a middleware and talks directly to https://www.omdbapi.com/. From there it fetches the poster-url and returns it.

## Development

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

**Response**:

**Example:**

```bash
http://localhost:3000/?id=tt1477834
```

**Returns:**

```json
{
  "poster": "https://m.media-amazon.com/images/M/MV5BOTk5ODg0OTU5M15BMl5BanBnXkFtZTgwMDQ3MDY3NjM@._V1_SX300.jpg"
}
```

## Test

```bash
npm run test
```

For testing, we use the suggested test-runner [ava](https://github.com/avajs/ava).
