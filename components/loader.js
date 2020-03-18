import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { P } from '../components';
import { light as t } from '../constants/themes';

const Loader = () => (
  <View style={s.loader}>
    <ActivityIndicator style={s.loader} size="large" color={t.colors.primary} />
    <P h style={s.p}>
      Cargando eventos...
    </P>
  </View>
);

const s = StyleSheet.create({
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  p: { marginTop: 30 },
});

export default Loader;
