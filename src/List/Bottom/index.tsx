import React from 'react';
import {DeviceEventEmitter, StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FAB} from '@rneui/base';
import router from '../../router';
import {EventNameEnum} from '../../constants';

const Bottom: React.FunctionComponent = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const onPress = () => {
    DeviceEventEmitter.emit(EventNameEnum.PERMISSION_CHECK);
    navigation.navigate(router.detail.name);
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
    position: 'absolute',
    bottom: 24,
    left: '50%',
    transform: [{translateX: -25}],
  },
});

export default Bottom;
