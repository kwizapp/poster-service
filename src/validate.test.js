const test = require("ava");

const validate = require("./validate");

const invalidFormatErrorMsg = `The passed id is not valid or has the wrong format. A correct id looks like this: tt3896198, two t followed by 7 digits`;
const noIdErrorMsg = `No id parameter passed in the url.`;

test("validate correct format", t => {
  const input = "tt3896198";

  t.notThrows(() => validate(input));
});

test("validate undefined input", t => {
  const input = undefined;

  const expected = noIdErrorMsg;
  const error = t.throws(() => validate(input));

  t.is(error.message, expected);
});

test("validate wrong input format (id starting with xx)", t => {
  const input = "xx3896198";

  const expected = invalidFormatErrorMsg;
  const error = t.throws(() => validate(input));

  t.is(error.message, expected);
});

test("validate wrong input format (id ending with letters)", t => {
  const input = "tt38hello";

  const expected = invalidFormatErrorMsg;
  const error = t.throws(() => validate(input));

  t.is(error.message, expected);
});
