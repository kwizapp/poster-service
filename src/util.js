const { createError } = require("micro");

const addSizeToUrl = function(url, size) {
  const exists = url.indexOf("SX300");

  // doesn't exist
  if (exists === -1) {
    throw createError(
      400,
      `Unable to fetch movie poster with specified size ${size}`
    );
  } else {
    return url.replace("SX300", `SX${size}`);
  }
};

module.exports = {
  addSizeToUrl: addSizeToUrl
};
