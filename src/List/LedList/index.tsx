import {DeviceEventEmitter, StyleSheet, View, ScrollView} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button, Icon, ListItem, Tab, TabView} from '@rneui/base';
import React from 'react';
import {DifficultyList, ILedItem, TableRow} from '../../models/types';
import router from '../../router';
import {ledModal} from '../../models';
import {EventNameEnum} from '../../constants';

interface IProps {
  data: TableRow<ILedItem>[];
}

const LedList: React.FunctionComponent<IProps> = ({data}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [index, setIndex] = React.useState(0);

  const rightContent = (rowid: number) => (
    <Button
      title="Delete"
      onPress={async () => {
        await ledModal?.deleteItem(rowid);
        DeviceEventEmitter.emit(EventNameEnum.PERMISSION_CHECK);
        // 刷新列表
        DeviceEventEmitter.emit(EventNameEnum.REFRESH_LIST);
      }}
      icon={{name: 'delete', color: 'white'}}
      buttonStyle={styles.rightContent}
    />
  );

  const renderList = (list: TableRow<ILedItem>[]) => {
    return (
      <>
        <ScrollView>
          {list.map(item => (
            <ListItem.Swipeable
              key={item.rowid}
              onPress={() => {
                DeviceEventEmitter.emit(EventNameEnum.PERMISSION_CHECK);
                navigation.navigate(router.detail.name, {rowid: item.rowid});
              }}
              rightContent={() => rightContent(item.rowid)}>
              <Icon name="label-important-outline" type="material" />
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem.Swipeable>
          ))}
        </ScrollView>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        titleStyle={styles.tabTitle}
        indicatorStyle={styles.tabIndicator}
        scrollable>
        <Tab.Item title="全部" />
        {DifficultyList.map(item => (
          <Tab.Item key={item.value} title={item.name} />
        ))}
      </Tab>

      <TabView
        value={index}
        onChange={setIndex}
        animationType="spring"
        disableSwipe>
        <TabView.Item style={styles.tabViewItem}>
          {renderList(data)}
        </TabView.Item>

        {DifficultyList.map(item => (
          <TabView.Item key={item.value} style={styles.tabViewItem}>
            {renderList(
              data.filter(childItem => childItem.difficulty === item.value),
            )}
          </TabView.Item>
        ))}
      </TabView>
    </View>
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
  tabIndicator: {
    backgroundColor: '#2089dc',
    height: 3,
  },
  tabTitle: {
    color: '#2089dc',
    fontSize: 12,
  },
  tabViewItem: {
    width: '100%',
    backgroundColor: 'white',
  },
});

export default LedList;
