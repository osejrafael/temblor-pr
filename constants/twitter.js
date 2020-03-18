import { yesterday } from './helpers';

export default [
  {
    screen_name: 'ElNuevoDia',
    count: 3,
    endpoint: 'statuses/user_timeline',
  },
  {
    screen_name: 'VoceroPR',
    count: 2,
    endpoint: 'statuses/user_timeline',
  },
  {
    screen_name: 'primerahora',
    count: 3,
    endpoint: 'statuses/user_timeline',
  },
  // {
  //   q: `temblor since:${yesterday()}`,
  //   count: 5,
  //   endpoint: 'search/tweets',
  // },
];
