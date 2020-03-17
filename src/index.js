const { parse } = require("url");

module.exports = async (req, res) => {
  const { query } = parse(req.url, true);
  const { id } = query;

  // TODO: validate the passed parameters

  return {
    poster: "poster for IMDb-ID " + id
  };
};
