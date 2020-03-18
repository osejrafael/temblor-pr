const tw = require('twit');
const cors = require('cors')({ origin: true });
const NodeCache = require('node-cache');
const cache = new NodeCache();
const moment = require('moment');
const cacheTime = 600 * 3;
const functions = require('firebase-functions');

const yesterday = moment()
  .subtract(1, 'day')
  .format('YYYY-MM-DD');

const fromNow = twitterDate =>
  moment(twitterDate, 'dd MMM DD HH:mm:ss ZZ YYYY').fromNow() || null;

const query = {
  q:
    'from:jayfonsecapr+' +
    'OR+from:ElNuevoDia+' +
    'OR+from:DavidBegnaud+' +
    'OR+from:radioislatv+' +
    'OR+from:VoceroPR+' +
    'OR+from:primerahora+' +
    `AND+since:${yesterday}`,
  count: 75,
};

const t = new tw({
  consumer_key: functions.config().twitter.consumer_key,
  consumer_secret: functions.config().twitter.consumer_secret,
  access_token: functions.config().twitter.access_token,
  access_token_secret: functions.config().twitter.access_token_secret,
});

async function fetchTweets() {
  try {
    const tweets = await t.get('search/tweets', query).then(r => r.data);

    return 'statuses' in tweets ? tweets.statuses : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function twitter(req, res) {
  try {
    const key = 'tweets';
    let tweets = cache.get(key);

    if (!tweets) {
      tweets = await fetchTweets();
      tweets = tweets.map(t => ({
        id: t.id,
        username: t.user.screen_name,
        name: t.user.name,
        pic: t.user.profile_image_url,
        body: t.text,
        fromNow: fromNow(t.created_at),
        created_at: t.created_at,
      }));

      cache.set(key, tweets, cacheTime);
    }

    cors(req, res, () => res.send(tweets));
  } catch (e) {
    console.error(e);
    cors(req, res, () => res.send(error));
  }
}

module.exports = twitter;
