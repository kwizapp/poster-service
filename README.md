# poster-service

## Database

**Postgres:** We use the free postgres databse offered by heroku

- https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
- https://devcenter.heroku.com/articles/connecting-to-heroku-postgres-databases-from-outside-of-heroku#credentials

## What to do

- create an `.evn` file with the `.env.template`
- add the DATABASE_URL
  - you can get the url from within the secrets on github or on heroku inside the `poster-service` app addons

## How to run

`npm run start`

## Test

`npm run test`
