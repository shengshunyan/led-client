import React, {useState} from 'react';
import {Text, Button} from '@rneui/base';
import {StyleSheet, View} from 'react-native';
import {permission} from '../../utils/permission';

const NoPermission: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(false);

  const onPress = async () => {
    setLoading(true);
    await permission.check(true);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.noPermission}>无权限</Text>
      <Button
        containerStyle={styles.button}
        title="重试"
        onPress={onPress}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  noPermission: {
    textAlign: 'center',
    marginTop: 24,
  },
  button: {
    width: 120,
    marginTop: 24,
  },
});

export default NoPermission;
