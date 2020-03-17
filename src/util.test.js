const test = require("ava");

const { addSizeToUrl } = require("./util");

test("add size to URL", t => {
  const size = 999;
  const input =
    "https://m.media-amazon.com/images/M/MV5BOTk5ODg0OTU5M15BMl5BanBnXkFtZTgwMDQ3MDY3NjM@._V1_SX300.jpg";

  const expected =
    "https://m.media-amazon.com/images/M/MV5BOTk5ODg0OTU5M15BMl5BanBnXkFtZTgwMDQ3MDY3NjM@._V1_SX999.jpg";

  t.assert(addSizeToUrl(input, size), expected);
});

test("add size to URL (wrong input URL)", t => {
  const size = 999;
  const input =
    "https://m.media-amazon.com/images/M/MV5BOTk5ODg0OTU5M15BMl5BanBnXkFtZTgwMDQ3MDY3NjM@._V1.jpg";

  const error = t.throws(() => addSizeToUrl(input, size));

  const expected = `Unable to fetch movie poster with specified size ${size}`;

  t.is(error.message, expected);
});
