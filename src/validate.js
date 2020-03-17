const { createError } = require("micro");

module.exports = function(input) {
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
