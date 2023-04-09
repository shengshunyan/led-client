import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import LedList from './LedList';
import Bottom from './Bottom';
import {ledModal} from '../models';
import {ILedItem, TableRow} from '../models/types';

const List: React.FunctionComponent = () => {
  const [list, setList] = useState<TableRow<ILedItem>[]>([]);

  useEffect(() => {
    const init = async () => {
      const data = (await ledModal?.getList()) || [];
      setList(data);
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      <LedList data={list} />
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
