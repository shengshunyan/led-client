import React, {useEffect, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {settingModal} from '../models';
import router from '../router';

const Quantity: React.FunctionComponent = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);

  const onRowChange = (value: string) => {
    const newValue = value.replace(/[^0-9]/g, '');
    setRow(Number(newValue));
  };
  const onColChange = (value: string) => {
    const newValue = value.replace(/[^0-9]/g, '');
    setCol(Number(newValue));
  };

  const onSubmit = async () => {
    await settingModal?.set({rowCount: row, colCount: col});
    navigation.navigate(router.list.name);
  };

  useEffect(() => {
    const init = async () => {
      const setting = await settingModal?.get();
      setRow(setting?.rowCount || 10);
      setCol(setting?.colCount || 10);
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Text>行：</Text>
      <TextInput
        value={String(row)}
        onChangeText={onRowChange}
        keyboardType="numeric"
        placeholder="请输入数字"
      />

      <Text>列：</Text>
      <TextInput
        value={String(col)}
        onChangeText={onColChange}
        keyboardType="numeric"
        placeholder="请输入数字"
      />

      <Button title="保存" onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
});

export default Quantity;
