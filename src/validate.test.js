const test = require("ava");

const { validateId, validateSize } = require("./validate");

const invalidFormatErrorMsg = `The passed id is not valid or has the wrong format. A correct id looks like this: tt3896198, two t followed by 7 digits`;
const noIdErrorMsg = `No id parameter passed in the url.`;

test("[id] validate correct format", t => {
  const input = "tt3896198";

  t.notThrows(() => validateId(input));
});

test("[id] validate undefined input", t => {
  const input = undefined;

  const expected = noIdErrorMsg;
  const error = t.throws(() => validateId(input));

  t.is(error.message, expected);
});

test("[id] validate wrong input format (id starting with xx)", t => {
  const input = "xx3896198";

  const expected = invalidFormatErrorMsg;
  const error = t.throws(() => validateId(input));

  t.is(error.message, expected);
});

test("[id] validate wrong input format (id ending with letters)", t => {
  const input = "tt38hello";

  const expected = invalidFormatErrorMsg;
  const error = t.throws(() => validateId(input));

  t.is(error.message, expected);
});

test("[size] validate correct size", t => {
  const input = 450;

  const size = validateSize(input);
  t.assert(size === input);
});

test("[size] validate undefined input", t => {
  const input = undefined;

  const size = validateSize(input);
  t.assert(size === 300);
});

test("[size] validate NaN input", t => {
  const input = "hello world";

  const expected = `URL parameter size must be a number`;
  const error = t.throws(() => validateSize(input));

  t.is(error.message, expected);
});

test("[size] validate input with incorrect size", t => {
  const input = 299;
  const input2 = 1001;

  const expected = `URL parameter size must be in the range of [300, 1000]`;
  const error = t.throws(() => validateSize(input));
  t.is(error.message, expected);

  const error2 = t.throws(() => validateSize(input2));
  t.is(error2.message, expected);
});
