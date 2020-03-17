const axios = require("axios");
const { createError } = require("micro");
const { parse } = require("url");

const validate = require("./validate");

require("dotenv").config();

module.exports = async (req, res) => {
  const { query } = parse(req.url, true);
  const { id } = query;

  // validate the passed parameters
  validate(id);

  // Setup URL for fetching data from OMDb
  const url = `https://www.omdbapi.com/?i=${id}&apikey=${process.env.API_KEY}`;

  // Query OMDb
  try {
    const response = await axios.get(url);
    const data = response.data;
    return {
      poster: data.Poster
    };
  } catch (error) {
    // console.log(error.response.data.Error);
    throw createError(400, "Unable to get movie poster from omdbapi.com");
  }
};
