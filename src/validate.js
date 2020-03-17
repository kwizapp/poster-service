const { createError } = require("micro");

const validateId = function(input) {
  if (input === undefined) {
    throw createError(400, `No id parameter passed in the url.`);
  }

  const regex = /^tt[0-9]{7}$/;

  if (!input.match(regex)) {
    throw createError(
      400,
      `The passed id is not valid or has the wrong format. A correct id looks like this: tt3896198, two t followed by 7 digits`
    );
  }
};

const validateSize = function(size) {
  if (size === undefined) {
    return 300;
  }

  if (isNaN(size)) {
    throw createError(400, `URL parameter size must be a number`);
  }

  if (size < 300 || size > 1000) {
    throw createError(
      400,
      `URL parameter size must be in the range of [300, 1000]`
    );
  }

  return size;
};

module.exports = {
  validateId: validateId,
  validateSize: validateSize
};
