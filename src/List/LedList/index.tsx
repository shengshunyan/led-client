import {DeviceEventEmitter, StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button, Icon, ListItem} from '@rneui/base';
import React from 'react';
import {ScrollView} from 'react-native';
import {ILedItem, TableRow} from '../../models/types';
import router from '../../router';
import {ledModal} from '../../models';
import {EventNameEnum} from '../../constants';

interface IProps {
  data: TableRow<ILedItem>[];
}

const LedList: React.FunctionComponent<IProps> = ({data}) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const rightContent = (rowid: number) => (
    <Button
      title="Delete"
      onPress={async () => {
        await ledModal?.deleteItem(rowid);
        // 刷新列表
        DeviceEventEmitter.emit(EventNameEnum.REFRESH_LIST);
      }}
      icon={{name: 'delete', color: 'white'}}
      buttonStyle={styles.rightContent}
    />
  );

  return (
    <ScrollView style={styles.container}>
      {data.map(item => (
        <ListItem.Swipeable
          key={item.rowid}
          onPress={() =>
            navigation.navigate(router.detail.name, {rowid: item.rowid})
          }
          rightContent={() => rightContent(item.rowid)}>
          <Icon name="label-important-outline" type="material" />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rightContent: {
    minHeight: '100%',
    backgroundColor: 'red',
  },
});

export default LedList;
