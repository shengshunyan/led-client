import React, {useEffect, useState} from 'react';
import {View, StyleSheet, DeviceEventEmitter, Text} from 'react-native';
import LedList from './LedList';
import Bottom from './Bottom';
import {ledModal} from '../models';
import {ILedItem, TableRow} from '../models/types';
import {EventNameEnum} from '../constants';

const List: React.FunctionComponent = () => {
  const [list, setList] = useState<TableRow<ILedItem>[]>([]);

  const getList = async () => {
    const data = (await ledModal?.getList()) || [];
    setList(data);
  };

  // 初始化获取列表
  useEffect(() => {
    getList();
  }, []);

  // 监听列表刷新事件
  useEffect(() => {
    const eventListener = DeviceEventEmitter.addListener(
      EventNameEnum.REFRESH_LIST,
      getList,
    );

    return () => {
      eventListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {list.length === 0 && (
        <View style={styles.emptyList}>
          <Text>暂无数据</Text>
        </View>
      )}
      {list.length > 0 && <LedList data={list} />}
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
  emptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default List;
