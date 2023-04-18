import * as React from 'react';
import {StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

const Debug: React.FunctionComponent = () => {
  return (
    <WebView
      containerStyle={styles.container}
      source={{uri: 'https://reactnative.dev/'}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Debug;
