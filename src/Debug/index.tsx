import * as React from 'react';
import {StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

const Debug: React.FunctionComponent = () => {
  return (
    <WebView
      containerStyle={styles.container}
      source={{uri: 'http://4.3.2.1/'}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Debug;
