const http = require("http");
const micro = require("micro");
const test = require("ava");
const listen = require("test-listen");
const request = require("request-promise");

const server = require("./index");

test("main endpoint", async t => {
  const service = micro(server);
  const url = await listen(service);
  const body = await request(url);

  t.true("Welcome to Micro" === body);
  service.close();
});
