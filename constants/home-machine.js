import { assign, Machine } from 'xstate';
import { quakesUrl as endpoint, invoke as src } from './helpers';

const homeMachine = Machine({
  id: 'home',
  initial: 'loading',
  context: {
    endpoint,
    quakeCount: 0,
    events: [],
    markers: [],
    initialRegion: {
      latitude: 17.9716301,
      longitude: -66.9079514,
      latitudeDelta: 6.7,
      longitudeDelta: 6.7,
    },
  },
  states: {
    loading: {
      invoke: {
        src,
        onDone: {
          target: 'idle',
          actions: assign({
            markers: (_, e) => e.data,
            events: (_, e) => e.data,
            quakeCount: (_, e) => e.data.length,
          }),
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: (_, e) => e.data,
          }),
        },
      },
    },
    idle: {
      invoke: {
        src: async (ctx, e) =>
          await (e.type === 'SELECT_EVENT' ? [e.quake] : []),
      },
      on: {
        SELECT_EVENT: {
          target: 'idle',
          actions: assign({
            markers: (ctx, e) => [e.quake],
          }),
        },
        REFRESH: {
          target: 'loading',
        },
      },
    },
    failure: {
      on: {
        RETRY: 'loading',
      },
    },
  },
});

export default homeMachine;
