const { createError } = require("micro");

const addSizeToUrl = function(url, size) {
  const exists = url.indexOf("SX300");

  // doesn't exist
  if (exists === -1) {
    throw createError(
      400,
      `Unable to fetch movie poster because the provided url is invalid.`
    );
  } else {
    return url.replace("SX300", `SX${size}`);
  }
};

module.exports = {
  addSizeToUrl: addSizeToUrl
};
