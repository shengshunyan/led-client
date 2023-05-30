import * as React from 'react';
import {StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {IP} from '../constants';

const Debug: React.FunctionComponent = () => {
  return (
    <WebView
      containerStyle={styles.container}
      source={{uri: `http://${IP}/`}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Debug;
