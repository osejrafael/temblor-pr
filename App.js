import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import Navigator from './components/navigator';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import ErrorBoundary from './components/error';
import { light as t } from './constants/themes';

const App = () => {
  const [ready, setReady] = useState(false);

  if (ready) {
    return (
      <>
        <StatusBar
          networkActivityIndicatorVisible
          backgroundColor={t.colors.primary}
          barStyle="dark-content"
        />
        <ErrorBoundary>
          <Navigator />
        </ErrorBoundary>
      </>
    );
  }

  return (
    <AppLoading
      startAsync={loadResourcesAsync}
      // onError={e => console.log(e)}
      onFinish={() => setReady(true)}
    />
  );
};

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      'proxima-nova': require('./assets/fonts/proxima-nova/ProximaNova-Regular.otf'),
      'proxima-nova-bold': require('./assets/fonts/proxima-nova/ProximaNova-Bold.otf'),
      'proxima-nova-thin': require('./assets/fonts/proxima-nova/ProximaNova-Thin.otf'),
    }),
  ]);
}

export default App;
