import React from 'react';
import { Text, PixelRatio } from 'react-native';
import { light as t } from '../constants/themes';
const res = PixelRatio.get();

const P = ({ children, style, h, b, c, onPress }) => (
  <Text
    onPress={onPress}
    style={[
      {
        lineHeight: res < 3 ? 18 : 24,
        color: h ? t.colors.black : c ? t.colors.grey : t.colors.greyDark,
        fontWeight: h || b ? 'bold' : 'normal',
        fontSize: h ? t.sizes.lg : c ? t.sizes.sm : t.sizes.normal,
        fontFamily:
          h || b
            ? 'proxima-nova-bold'
            : c
            ? 'proxima-nova-thin'
            : 'proxima-nova',
      },
      style,
    ]}
  >
    {children}
  </Text>
);

export { P };
