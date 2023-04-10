import React, {useEffect, useState, useRef, useCallback} from 'react';
import {View, StyleSheet, Text, DeviceEventEmitter} from 'react-native';
import {
  RouteProp,
  useRoute,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {ButtonGroup, Input} from '@rneui/themed';
import {showMessage} from 'react-native-flash-message';
import {EventNameEnum} from '../constants';
import LedList from './LedList';
import {ledModal} from '../models';
import router from '../router';

const Detail: React.FunctionComponent<{navigation: any}> = function () {
  const inputRef = useRef<any>();
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<{params: {rowid: number} | undefined}>>();
  const {rowid} = route.params || {};

  /** 名称 */
  const [name, setName] = useState('');
  /** 难度 */
  const [difficulty, setDifficulty] = useState(0);
  /** 灯串配置 */
  const [config, setConfig] = useState<Record<string, Record<string, string>>>(
    {},
  );

  // 编辑模式：需要获取旧配置详情
  useEffect(() => {
    const init = async () => {
      if (!rowid && rowid !== 0) {
        return;
      }

      const detail = await ledModal?.getItem(rowid).catch(error => {
        console.log('获取详情错误: ', error, rowid);
      });
      if (!detail) {
        return;
      }

      setName(detail.name);
      setDifficulty(detail.difficulty);
      setConfig(JSON.parse(detail.config));
    };
    init();
  }, [rowid]);

  // 保存
  const onSubmit = useCallback(() => {
    // 校验名称必填
    if (name.length === 0) {
      inputRef.current.shake();
      showMessage({
        message: '请输入名称',
        type: 'warning',
      });
      return;
    }

    if (!rowid && rowid !== 0) {
      // 新增
      ledModal?.addItem({
        name,
        difficulty,
        config: JSON.stringify(config),
      });
    } else {
      // 编辑
      ledModal?.editItem({
        rowid,
        name,
        difficulty,
        config: JSON.stringify(config),
      });
    }

    // 刷新列表
    DeviceEventEmitter.emit(EventNameEnum.REFRESH_LIST);
    // 导航到列表
    navigation.navigate(router.list.name);
  }, [config, difficulty, name, navigation, rowid]);

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
        onChangeText={(value: string) => {
          setName(value);
        }}
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
