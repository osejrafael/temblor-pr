import React from 'react';
import { StyleSheet, View } from 'react-native';
import { light as t } from '../constants/themes';

const Card = ({ children, style }) => (
  <View style={[s.card, style]}>{children}</View>
);

const s = StyleSheet.create({
  card: {
    backgroundColor: t.colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: t.colors.grey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default Card;
