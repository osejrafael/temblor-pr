const cors = require('cors')({ origin: true });
const axios = require('axios');
const moment = require('moment');
const NodeCache = require('node-cache');
const cache = new NodeCache();
const serialize = obj => {
  const str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};

const query = {
  orderby: 'time',
  minmagnitude: 4,
  format: 'geojson',
  latitude: 17.9,
  longitude: -66.8,
  maxradius: 5,
};
const url = 'https://earthquake.usgs.gov/fdsnws/event/1/query';
const ENDPOINT = `${url}?${serialize(query)}&starttime=01-01-2020`;
const cacheTimer = 300;

async function quakes(req, res) {
  try {
    const key = 'quakes';
    let data = cache.get(key);

    if (!data) {
      data = (await axios(ENDPOINT)).data.features;
      data = data.map(f => ({
        id: f.id,
        title: f.properties.title,
        place: f.properties.place,
        tweetTime: f.properties.time,
        time: moment(f.properties.time).fromNow(),
        mag: f.properties.mag,
        coordinates: {
          latitude: f.geometry.coordinates[1],
          longitude: f.geometry.coordinates[0],
        },
      }));

      cache.set(key, data, cacheTimer);
    }

    cors(req, res, () => res.send(data));
  } catch (error) {
    console.error(error);
    cors(req, res, () => res.send(error));
  }
}

module.exports = quakes;
