import { AsyncStorage } from 'react-native';
import { assign, Machine } from 'xstate';
import { twitterUrl as endpoint, invoke as src } from './helpers';
import twitterUsers from './twitter';

const newsMachine = Machine({
  id: 'news',
  initial: 'loading',
  context: {
    endpoint,
    tweets: [],
  },
  states: {
    loading: {
      invoke: {
        src,
        onError: 'failure',
        onDone: {
          target: 'idle',
          actions: assign({
            tweets: (_, e) => e.data,
          }),
        },
      },
    },
    failure: {},
    idle: {
      actions: assign({
        tweets: (_, e) => e.tweets,
      }),
      type: 'final',
    },
  },
});

export default newsMachine;
