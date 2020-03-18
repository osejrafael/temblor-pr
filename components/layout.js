import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { light as t } from '../constants/themes';
import { P } from './';

const Layout = ({ children }) => (
  <>
    <View style={s.header}>
      <P style={s.title} h>
        Temblor PR
      </P>
    </View>
    <View style={s.container}>
      <View style={s.body}>{children}</View>
    </View>
  </>
);

const s = StyleSheet.create({
  header: {
    height: 75,
    backgroundColor: t.colors.primary,
  },
  title: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 3,
  },
  body: {
    flex: 1,
    paddingTop: 16,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    backgroundColor: t.colors.whiteGrey,
  },
});

export default Layout;
