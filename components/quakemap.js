import React, { useContext } from 'react';
import MapView from 'react-native-map-clustering';
import { Callout, Marker } from 'react-native-maps';
import { light as t } from '../constants/themes';
import { paintMarker } from '../constants/helpers';
import { P } from './';

const QuakeMap = ({ initialRegion, markers }) => (
  <MapView
    initialRegion={initialRegion}
    style={{ flex: 1, borderRadius: 8 }}
    clusterColor={t.colors.primary}
    clusterTextColor={t.colors.black}
  >
    {markers.map(({ id, coordinates, place, mag, time, title }) => (
      <Marker
        key={id}
        title={place}
        tracksViewChanges={false}
        pinColor={paintMarker(mag)}
        coordinate={coordinates}
      >
        <Callout>
          <P h>{title}</P>
          <P>{time}</P>
        </Callout>
      </Marker>
    ))}
  </MapView>
);

export default React.memo(QuakeMap);
