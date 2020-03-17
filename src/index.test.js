const micro = require("micro");
const test = require("ava");
const listen = require("test-listen");
const request = require("request-promise");

const server = require("./index");

test("with correct id format", async t => {
  const service = micro(server);
  const url = await listen(service);
  // make a request
  const returnedBodyFromRequest = await request(url + "/?id=tt3896198");
  const expected = `{"poster":"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"}`;

  t.deepEqual(returnedBodyFromRequest, expected);

  service.close();
});

test("with empty id url parameter", async t => {
  const service = micro(server);
  const url = await listen(service);

  // make a request
  const expected = `The passed id is not valid or has the wrong format.`;
  const error = await t.throwsAsync(() => request(url + "/?id="));

  t.is(error.error, expected);

  service.close();
});

test("with no id url parameter", async t => {
  const service = micro(server);
  const url = await listen(service);

  // make a request
  const expected = `No id parameter passed.`;
  const error = await t.throwsAsync(() => request(url));

  t.is(error.error, expected);

  service.close();
});

test("with wrong id format ()", async t => {
  const service = micro(server);
  const url = await listen(service);

  // make a request
  const expected = `The passed id is not valid or has the wrong format.`;
  const error = await t.throwsAsync(() => request(url + "/?id=xx3896198"));

  t.is(error.error, expected);

  service.close();
});
