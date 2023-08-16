"use strict";

// Imports:
const fetch = require("node-fetch");
const requestt = require("request");
require("dotenv/config");

const apiKey = process.env.GIF_API_KEY;
const maxGifsToGet = 20;
//NOTE: get the random happy gif (no params) or a random gif by search like /gifs/sad -> for a random sad gif
async function getGifBySearch(request, response) {
  try {
    const { gifType } = request.params;

    const searchBy = gifType || "happy";
    const reqUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchBy}&limit=${maxGifsToGet}`;
    const rawData = await fetch(reqUrl, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const data = await rawData.json();

    if (!data.data || !data.data.length) {
      console.error("No data found! No gifs in response.");
      response.sendStatus(404);
      return;
    }

    const randomIndex = getRandomArbitrary(0, data.data.length - 1);
    const randomGif = data.data[randomIndex || 0];
    // you can use different props from this obj, like original, still, downsized and etc...
    // console.log(randomGif);
    const randomGifUrl = randomGif.images.downsized.url;

    if (!randomGifUrl) {
      console.error("No data found! No gif to get.");
      response.sendStatus(404);
      return;
    }

    //NOTE: send img/gif to client from other APIs:
    requestt(
      {
        url: randomGifUrl,
        encoding: null,
      },
      (err, resp, _buffer) => {
        if (!err && resp.statusCode === 200) {
          response.set("Content-Type", "image/gif");
          response.send(resp.body);
        } else {
          console.error("Cant sent gif to client!");
          console.error(err, resp.statusCode);
          response.sendStatus(404);
        }
      }
    );
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  getGifBySearch,
};
