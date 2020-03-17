const test = require("ava");

const validate = require("./validate");

test("validate correct format", t => {
  const input = "tt3896198";

  t.notThrows(() => validate(input));
});

test("validate undefined input", t => {
  const input = undefined;

  const expected = `No id parameter passed.`;
  const error = t.throws(() => validate(input));

  t.is(error.message, expected);
});

test("validate wrong input format (id starting with xx)", t => {
  const input = "xx3896198";

  const expected = `The passed id is not valid or has the wrong format.`;
  const error = t.throws(() => validate(input));

  t.is(error.message, expected);
});

test("validate wrong input format (id ending with letters)", t => {
  const input = "tt38hello";

  const expected = `The passed id is not valid or has the wrong format.`;
  const error = t.throws(() => validate(input));

  t.is(error.message, expected);
});
