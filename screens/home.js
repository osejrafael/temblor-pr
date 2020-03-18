import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Vibration,
} from 'react-native';
import { P } from '../components';
import QuakeMap from '../components/quakemap';
import Event from '../components/event';
import { light as t } from '../constants/themes';
import Layout from '../components/layout';
import { useMachine } from '@xstate/react';
import homeMachine from '../constants/home-machine';
import Tutorial from '../components/tutorial';

const Home = () => {
  const [current, send] = useMachine(homeMachine);
  const { initialRegion, markers } = current.context;

  return (
    <Layout>
      <QuakeMap initialRegion={initialRegion} markers={markers} />
      <RefreshButton onPress={() => send('REFRESH')} current={current.value} />
      <Tutorial
        current={current.value}
        quakeCount={current.context.quakeCount}
      />
      <View style={{ marginTop: 16 }}>
        <ScrollView horizontal>
          {current.matches('loading') ? (
            <Event loading />
          ) : (
            current.context.events.map(f => (
              <Event
                key={f.id}
                title={f.title}
                coordinates={f.coordinates}
                place={f.place}
                mag={f.mag}
                time={f.time}
                onPress={() => {
                  Vibration.vibrate(400);
                  send('SELECT_EVENT', { quake: f });
                }}
              />
            ))
          )}
        </ScrollView>
      </View>
    </Layout>
  );
};

const RefreshButton = ({ onPress, current }) => (
  <P h style={s.refresh} onPress={onPress}>
    {current === 'loading' ? 'Refrescando...' : 'Refrescar'}
  </P>
);

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refresh: { color: t.colors.primary, textAlign: 'center' },
});

export default Home;
