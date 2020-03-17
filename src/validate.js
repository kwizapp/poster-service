const { createError } = require("micro");

module.exports = function(input) {
  const regex = /^tt[0-9]{7}$/;

  if (!input.match(regex)) {
    throw createError(
      400,
      `The passed id is not valid or has the wrong format.`
    );
  }
};
