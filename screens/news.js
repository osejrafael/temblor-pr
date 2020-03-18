import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useMachine } from '@xstate/react';
import { getLinkPreview } from 'link-preview-js';
import { useAd } from '../constants/helpers';
import newsMachine from '../constants/news-machine';
import { P } from '../components';
import Layout from '../components/layout';
import Card from '../components/card';
import { openBrowser } from '../constants/helpers';

const News = () => {
  useAd(3500);
  const [current, send] = useMachine(newsMachine);

  return (
    <Layout>
      {current.matches('loading') ? (
        <P h>Cargando noticias...</P>
      ) : (
        <>
          <P h>Noticias recientes</P>
          <Tweets feed={current.context.tweets} />
        </>
      )}
    </Layout>
  );
};

const Tweets = ({ feed }) => (
  <ScrollView>
    {feed.map(t => (
      <Tweet key={t.id} {...t} />
    ))}
  </ScrollView>
);

const Tweet = ({ pic, username, body, name, fromNow }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLinkPreview(body)
      .then(data => setPreview(data))
      .catch(e => setError(e));
  }, []);

  return (
    <Card style={s.tweetContainer}>
      <View style={s.tweetHeader}>
        <P b>{`@${username}`}</P>
        <P style={s.tweetDate}>{fromNow}</P>
      </View>
      <P style={{ marginBottom: 6 }}>{body}</P>
      <View style={s.tweetBody}>
        {preview && !error && <LinkPreview {...preview} />}
      </View>
    </Card>
  );
};

const LinkPreview = ({ description, images, siteName, title, url }) => (
  <TouchableOpacity style={s.preview} onPress={() => openBrowser(url)}>
    <Image
      style={{ width: '100%', height: 150 }}
      source={{
        uri: images[0],
      }}
    />
    <P b>{siteName}</P>
    <P>{description}</P>
  </TouchableOpacity>
);

const s = StyleSheet.create({
  tweetContainer: { marginVertical: 24 },
  tweetHeader: { flexDirection: 'row' },
  tweetDate: { marginLeft: 6 },
  tweetBody: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  preview: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default News;
