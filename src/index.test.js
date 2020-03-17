const micro = require("micro");
const test = require("ava");
const listen = require("test-listen");
const request = require("request-promise");

const server = require("./index");

const invalidFormatErrorMsg = `The passed id is not valid or has the wrong format. A correct id looks like this: tt3896198, two t followed by 7 digits`;
const noIdErrorMsg = `No id parameter passed in the url.`;
const sizeNotANumberErrorMsg = `URL parameter size must be a number`;
const sizeNotInRangeErrorMsg = `URL parameter size must be in the range of [300, 1000]`;

test("with correct id format", async t => {
  const service = micro(server);
  const url = await listen(service);
  // make a request
  const returnedBodyFromRequest = await request(url + "/?id=tt3896198");
  const expected = `{"poster":"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"}`;

  t.deepEqual(returnedBodyFromRequest, expected);

  service.close();
});

test("with no id url parameter", async t => {
  const service = micro(server);
  const url = await listen(service);

  // make a request
  const expected = noIdErrorMsg;
  const error = await t.throwsAsync(() => request(url));

  t.is(error.error, expected);

  service.close();
});

test("with empty id url parameter", async t => {
  const service = micro(server);
  const url = await listen(service);

  // make a request
  const expected = invalidFormatErrorMsg;
  const error = await t.throwsAsync(() => request(url + "/?id="));

  t.is(error.error, expected);

  service.close();
});

test("with wrong id format ()", async t => {
  const service = micro(server);
  const url = await listen(service);

  // make a request
  const expected = invalidFormatErrorMsg;
  const error = await t.throwsAsync(() => request(url + "/?id=xx3896198"));

  t.is(error.error, expected);

  service.close();
});

test("with correct size format", async t => {
  const service = micro(server);
  const url = await listen(service);
  // make a request
  const returnedBodyFromRequest = await request(
    url + "/?id=tt3896198&size=450"
  );
  const expected = `{"poster":"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX450.jpg"}`;

  t.deepEqual(returnedBodyFromRequest, expected);

  service.close();
});

test("with wrong size format (letters)", async t => {
  const service = micro(server);
  const url = await listen(service);

  // make a request
  const expected = sizeNotANumberErrorMsg;
  const error = await t.throwsAsync(() =>
    request(url + "/?id=tt3896198&size=hello")
  );

  t.is(error.error, expected);

  service.close();
});

test("with wrong size format (number too large or too small)", async t => {
  const service = micro(server);
  const url = await listen(service);

  // make a request
  const expected = sizeNotInRangeErrorMsg;
  const error = await t.throwsAsync(() =>
    request(url + "/?id=tt3896198&size=9999")
  );

  t.is(error.error, expected);

  service.close();
});
