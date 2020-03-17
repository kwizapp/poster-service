const axios = require("axios");
const { createError } = require("micro");
const { parse } = require("url");

const { validateId, validateSize } = require("./validate");
const { addSizeToUrl } = require("./util");

require("dotenv").config();

module.exports = async (req, res) => {
  const { query } = parse(req.url, true);
  const { id, size } = query;

  // validate the passed id
  validateId(id);

  // validate the passed size
  const imgSize = validateSize(size);

  // Setup URL for fetching data from OMDb
  const url = `https://www.omdbapi.com/?i=${id}&apikey=${process.env.API_KEY}`;

  // Query OMDb
  try {
    const response = await axios.get(url);
    const data = response.data;

    // construct url with the integrated size parameters
    const posterUrl = addSizeToUrl(data.Poster, imgSize);

    return {
      poster: posterUrl
    };
  } catch (error) {
    // console.log(error.response.data.Error);
    throw createError(400, "Unable to get movie poster from omdbapi.com");
  }
};
