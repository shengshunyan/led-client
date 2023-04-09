import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FAB} from '@rneui/base';

const Bottom: React.FunctionComponent = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const onPress = () => {
    navigation.navigate('Detail');
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
