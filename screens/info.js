import React from 'react';
import { P } from '../components';
import Layout from '../components/layout';
import Card from '../components/card';

const InfoScreen = () => (
  <Layout>
    <P h>Información</P>
    <Card>
      <P>
        Esta app se hizo para facilitar el acceso a la información relacionada a
        terremotos. Se integran diferentes fuentes de información como noticias,
        contactos de emergencia (actualizados periodicamente), mapa interactivo
        de eventos sísmicos convenientemente en un mismo lugar. Pronto mucho
        más...
      </P>
    </Card>
  </Layout>
);

export default InfoScreen;
