import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { P } from './';
import { paintMarker } from '../constants/helpers';

const Event = ({ coordinates, loading, onPress, place, mag, time, title }) => {
  if (loading) {
    return (
      <TouchableOpacity
        disabled
        style={[s.quake, { borderBottomColor: paintMarker(0) }]}
      >
        <P>{0.0}</P>
        <P>Cargando eventos...</P>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => onPress({ title, coordinates, place, mag, time })}
      style={[s.quake, { borderBottomColor: paintMarker(mag) }]}
    >
      <P>{mag}</P>
      <P>{time}</P>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  quake: {
    alignItems: 'center',
    marginRight: 16,
    borderBottomWidth: 5,
    paddingHorizontal: 16,
    borderBottomEndRadius: 6,
    borderBottomLeftRadius: 6,
  },
});

export default Event;
