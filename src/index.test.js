const micro = require("micro");
const test = require("ava");
const listen = require("test-listen");
const request = require("request-promise");

const server = require("./index");

test("poster API", async t => {
  const service = micro(server);
  const url = await listen(service);
  // make a request
  const returnedBodyFromRequest = await request(url + "/?id=tt3896198");
  const expected = `{"poster":"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"}`;

  t.deepEqual(returnedBodyFromRequest, expected);

  service.close();
});
