const micro = require("micro");
const test = require("ava");
const listen = require("test-listen");
const request = require("request-promise");

const server = require("./index");

test("poster API", async t => {
  const service = micro(server);
  const url = await listen(service);
  const body = await request(url + "/?id=10");

  t.deepEqual(body, '{"poster":"poster for IMDb-ID 10"}');

  service.close();
});
