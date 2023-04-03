import React from 'react';
import {View, StyleSheet} from 'react-native';
import LedList from './LedList';
import Bottom from './Bottom';

const List: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <LedList />
      <Bottom />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default List;
