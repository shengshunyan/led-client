import React, {useEffect, useState, useRef, useCallback} from 'react';
import {View, StyleSheet, Text, DeviceEventEmitter} from 'react-native';
import {ButtonGroup, Input} from '@rneui/themed';
import {showMessage} from 'react-native-flash-message';
import {EventNameEnum} from '../constants';
import LedList from './LedList';
import {ledModal} from '../models';

const Detail: React.FunctionComponent<{navigation: any}> = function () {
  const inputRef = useRef<any>();

  /** 名称 */
  const [name, setName] = useState('');
  /** 难度 */
  const [difficulty, setDifficulty] = useState(0);
  /** 灯串配置 */
  const [config, setConfig] = useState<Record<string, Record<string, string>>>(
    {},
  );

  const onNameChange = (value: string) => {
    setName(value);
  };

  // 保存
  const onSubmit = useCallback(() => {
    // 校验名称必填
    if (name.length === 0) {
      inputRef.current.shake();
      showMessage({
        message: '请输入名称',
        type: 'warning',
      });
    }

    ledModal?.addItem({
      name,
      difficulty,
      config: JSON.stringify(config),
    });
  }, [config, difficulty, name]);

  // 监听保存按钮点击
  useEffect(() => {
    const eventListener = DeviceEventEmitter.addListener(
      EventNameEnum.DETAIL_SAVE,
      onSubmit,
    );

    return () => {
      eventListener.remove();
    };
  }, [onSubmit]);

  return (
    <View style={styles.container}>
      <Input
        placeholder="名称"
        value={name}
        onChangeText={onNameChange}
        ref={inputRef}
      />

      <Text style={styles.label}>难度：</Text>
      <ButtonGroup
        buttons={['简单', '普通', '困难']}
        selectedIndex={difficulty}
        onPress={value => {
          setDifficulty(value);
        }}
        containerStyle={styles.buttonGroup}
      />

      <Text style={styles.label}>灯串：</Text>
      <LedList config={config} setConfig={setConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    height: '95%',
  },
  label: {
    marginLeft: 12,
    fontSize: 18,
  },
  buttonGroup: {
    marginBottom: 24,
  },
});

export default Detail;
