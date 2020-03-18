import React from 'react';
import { StyleSheet, View } from 'react-native';
import { light as t } from '../constants/themes';
import Card from './card';
import { P } from './';

const Tutorial = ({ current, quakeCount }) => {
  const count = quakeCount > 0 ? quakeCount : 'Cargando';
  return (
    <>
      <Card>
        <P>
          {current === 'failure'
            ? `Error de comunicación con USGS 🛰. 
            Por favor, intente refrescar o cerrar y abrir el app.`
            : `Puedes mover la barra de eventos abajo y presionar alguno para enfocar. ${count} eventos sísmicos registrados desde enero 1 2020 con magnitud mayor de 4 según USGS.gov`}
        </P>
      </Card>
    </>
  );
};

export default Tutorial;
