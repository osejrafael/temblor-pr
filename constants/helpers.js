import { useEffect } from 'react';
import { Linking, Alert, Platform } from 'react-native';
import { AdMobInterstitial } from 'expo-ads-admob';

const donationLink = '';
const googleImagesLink =
  'https://www.google.com/search?q=puerto+rico+temblores+2020&tbs=qdr:m,isz:l&tbm=isch&sxsrf=ACYBGNR_elQiFA_vGwL7MTWW6m9CFw-BIQ:1580315130373&source=lnt&sa=X&ved=0ahUKEwjClurPnKnnAhVxvFkKHeGzBCcQpwUIIw&biw=1440&bih=761&dpr=2';
const twitterUrl = 'https://us-east1-road-trip-pr.cloudfunctions.net/twitter';
const quakesUrl = 'https://us-east1-road-trip-pr.cloudfunctions.net/quakes';

const invoke = async ctx => {
  try {
    const data = await fetch(ctx.endpoint).then(r => r.json());
    return data;
  } catch (e) {
    return [];
  }
};
const paintMarker = mag => {
  const colors = [
    '#911111',
    '#BA2525',
    '#E66A6A',
    '#DE911D',
    '#F7C948',
    '#FCE588',
    '#FFFBEA',
  ];
  const colorIndex = colors.length - parseFloat(mag);

  return colors[Math.round(colorIndex)] || '#FCE588';
};

const callNumber = phone => {
  let phoneNumber = `telprompt://${phone}`;

  if (Platform.OS === 'android') {
    phoneNumber = `tel://${phone}`;
  }

  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(e => {
      //console.log(e)
    });
};

const openBrowser = url => {
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        Alert.alert('Invalid URL');
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(e => {
      //console.log(e)
    });
};

const loadAdAsync = async () => {
  try {
    AdMobInterstitial.setAdUnitID('ca-app-pub-7355905140752356/3513965687');
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
  } catch (e) {
    // console.log(e);
  }
};

const useAd = (waitTime = 5000) => {
  useEffect(() => {
    const ad = setTimeout(() => loadAdAsync(), waitTime);

    return () => clearTimeout(ad);
  }, []);
};

export {
  useAd,
  invoke,
  quakesUrl,
  twitterUrl,
  callNumber,
  openBrowser,
  paintMarker,
  donationLink,
  googleImagesLink,
};
