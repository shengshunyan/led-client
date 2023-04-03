import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB} from '@rneui/base';

const Bottom: React.FunctionComponent = () => {
  const onPress = () => {
    // TODO: 添加逻辑
    console.log('add');
  };

  return (
    <FAB
      style={styles.container}
      visible={true}
      icon={{name: 'add', color: 'white'}}
      color="#2089dc"
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
});

export default Bottom;
