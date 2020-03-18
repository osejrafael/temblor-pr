import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { P } from '../components';
import Layout from '../components/layout';
import Card from '../components/card';
import contacts from '../constants/contacts';
import { light as t } from '../constants/themes';
import { callNumber } from '../constants/helpers';

const ContactsScreen = () => (
  <Layout>
    <P h>Manejo de Emergencias</P>
    <ContactList feed={contacts} />
  </Layout>
);

const ContactList = ({ feed }) => (
  <View>
    {feed.map(({ location, call, phone }) => (
      <TouchableOpacity
        key={phone}
        onPress={() => callNumber(call)}
        style={s.contactsContainer}
      >
        <Card style={s.contactContainer}>
          <P b>{location}</P>
          <P>{phone}</P>
        </Card>
      </TouchableOpacity>
    ))}
  </View>
);

const s = StyleSheet.create({
  contactsContainer: {},
  contactContainer: {
    marginBottom: t.sizes.normal,
    alignItems: 'center',
  },
});

export default ContactsScreen;
